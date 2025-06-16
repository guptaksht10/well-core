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

export const getUserDashboard = async (req, res, next) => {
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

export const getWorkoutsByDate = async (req, res, next) => {
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
export const addWorkout = async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const { workoutString } = req.body;
      if (!workoutString) {
        return next(createError(400, "Workout string is missing"));
      }
      const eachworkout = workoutString.split(";").map((line) => line.trim());
      const categories = eachworkout.filter((line) => line.startsWith("#"));
      if (categories.length === 0) {
        return next(createError(400, "No categories found in workout string"));
      }
  
      const parsedWorkouts = [];
      let currentCategory = "";
      let count = 0;
  
      eachworkout.forEach((line) => {
        count++;
        if (line.startsWith("#")) {
          const parts = line?.split("\n").map((part) => part.trim());
          console.log(parts);
          if (parts.length < 5) {
            return next(
              createError(400, `Workout string is missing for ${count}th workout`)
            );
          }
  
          currentCategory = parts[0].substring(1).trim();
          const workoutDetails = parseWorkoutLine(parts);
          if (workoutDetails == null) {
            return next(createError(400, "Please enter in proper format "));
          }
  
          if (workoutDetails) {
            workoutDetails.category = currentCategory;
            parsedWorkouts.push(workoutDetails);
          }
        } else {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }
      });
  
      parsedWorkouts.forEach(async (workout) => {
        workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
        await Workout.create({ ...workout, user: userId });
      });
  
      return res.status(201).json({
        message: "Workouts added successfully",
        workouts: parsedWorkouts,
      });
    } catch (err) {
      next(err);
    }
};

const parseWorkoutLine = (parts) => {
    const details = {};
    console.log(parts);
    if (parts.length >= 5) {
        details.workoutName = parts[1].substring(1).trim();
        details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
        details.reps = parseInt(parts[2].split("sets")[1].split("reps")[0].substring(1).trim());
        details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
        details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
        console.log(details);
        return details;
    }
    return null;
};      

const calculateCaloriesBurnt = (workoutDetails) => {
    const durationInMinutes = parseInt(workoutDetails.duration);
    const weightInKg = parseInt(workoutDetails.weight);
    const caloriesBurntPerMinute = 5; 
    return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};
