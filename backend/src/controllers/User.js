import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Workout from "../models/Workout.js";

import ErrorHandler from "../utils/ErrorHandler.js";

export const UserRegister = async (req, res, next) => {
    try{ 
        const {name, email, password, image} = req.body;
        if(!name || !email || !password){
            return next(new ErrorHandler("All fields are required", 409));
        }

        const user = await User.findOne({email}).exec();
        if(user){
            return next(new ErrorHandler("User already exists", 409));
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            image
        });
    
        const CreatedUser = await newUser.save();
        const token = jwt.sign({
            id: CreatedUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "999 years"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: CreatedUser,
            token
        })
    }catch(err) {
        return next(new ErrorHandler(err.message, 500));
    }
};


export const UserLogin = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler("All fields are required", 409));
        }

        const user = await User.findOne({email}).exec();
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return next(new ErrorHandler("Invalid credentials", 401));
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "999 years"
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        })
    }catch(err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

export const getDashboard = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).exec();
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }
       
        const currentDateFormatted = new Date();
        
        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()
        )
        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1
        )

        const totalcaloriesBurned = await Workout.aggregate([
            { $match: 
                {
                    user: req.user.id,
                    date: {
                        $gte: startToday,
                        $lt: endToday
                    }
                }
            },
            { $group: 
                {
                    _id: null,
                    totalCaloriesBurned: { $sum: "$caloriesBurned" }
                }
            }
        ]).exec();

        const totalWorkouts = await Workout.countDocuments({
            user: req.user.id,
            date: {
                $gte: startToday,
                $lt: endToday
            }
        }).exec();

        const averageCaloriePerWorkout = totalcaloriesBurned > 0 ? totalcaloriesBurned[0].totalCaloriesBurned / totalWorkouts : 0;

        const categoryCaloriesBurned = await Workout.aggregate([
            { $match: 
                {
                    user: req.user.id,
                    date: {
                        $gte: startToday,
                        $lt: endToday
                    }
                }
            },
            { $group: 
                {
                    _id: "$category",
                    totalCaloriesBurned: { $sum: "$caloriesBurned" }
                }
            }
        ]).exec();

        const pieChartData = categoryCaloriesBurned.map((category, index) => {
            return {
                id: index,
                label: category._id,
                value: category.totalCaloriesBurned
            }
        });

        const weeks = [];
        const caloriesBurnt = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(
              currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
            );
            weeks.push(`${date.getDate()}th`);
      
            const startOfDay = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            const endOfDay = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + 1
            );
      
            const weekData = await Workout.aggregate([
              {
                $match: {
                  user: user._id,
                  date: { $gte: startOfDay, $lt: endOfDay },
                },
              },
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                  totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                },
              },
              {
                $sort: { _id: 1 },
              },
            ]);
      
            caloriesBurnt.push(
              weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
            );
          }

          return res.status(200).json({
            totalCaloriesBurnt:
              totalcaloriesBurned.length > 0
                ? totalcaloriesBurned[0].totalCaloriesBurnt
                : 0,
            totalWorkouts: totalWorkouts,
            avgCaloriesBurntPerWorkout: averageCaloriePerWorkout,
            totalWeeksCaloriesBurnt: {
              weeks: weeks,
              caloriesBurned: caloriesBurnt,
            },
            pieChartData: pieChartData,
          });

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
};

export const getWorkoutByDate = async (req, res, next) => {
    try{
        const userId = req.user?.id;
        const user = await User.findById(userId);
        let date = req.query.date ? new Date(req.query.date) : new Date();
        if (!user) {
          return next(new ErrorHandler(404, "User not found"));
        }
        const startOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        const endOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        );
    
        const todaysWorkouts = await Workout.find({
            userId: userId,
            date: { $gte: startOfDay, $lt: endOfDay },
        });
        
        const totalCaloriesBurnt = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned,
            0
        );
        
        return res.status(200).json({ 
            todaysWorkouts, totalCaloriesBurnt 
        });

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
};


