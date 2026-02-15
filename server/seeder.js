require("dotenv").config()

const db = require("./config/db")
const Event = require("./models/Event.models")

const events = [
    {
        name: "AI & Machine Learning Summit",
        organizer: "TechNova Labs",
        location: "Bangalore",
        date: new Date("2026-04-10"),
        description: "Explore the latest trends in AI and ML.",
        capacity: 10,
        category: "Technology"
    },
    {
        name: "Startup Pitch Night",
        organizer: "Founders Hub",
        location: "Mumbai",
        date: new Date("2026-03-15"),
        description: "Pitch your startup to investors.",
        capacity: 5,
        category: "Startup"
    },
    {
        name: "Digital Marketing Masterclass",
        organizer: "Growth Academy",
        location: "Delhi",
        date: new Date("2026-05-20"),
        description: "Learn advanced digital marketing strategies.",
        capacity: 20,
        category: "Business"
    },
    {
        name: "React.js Hands-on Workshop",
        organizer: "CodeCamp India",
        location: "Hyderabad",
        date: new Date("2026-02-25"),
        description: "Build real-world React applications.",
        capacity: 15,
        category: "Workshop"
    },
    {
        name: "National Music Fest 2026",
        organizer: "LiveNation India",
        location: "Chennai",
        date: new Date("2026-06-12"),
        description: "Live performances from top artists.",
        capacity: 20,
        category: "Music"
    },
    {
        name: "Marathon 10K Run",
        organizer: "FitLife Club",
        location: "Pune",
        date: new Date("2025-01-30"), // past event
        description: "Join the city marathon challenge.",
        capacity: 10,
        category: "Sports"
    },
    {
        name: "Cybersecurity Conference",
        organizer: "SecureIT",
        location: "Bangalore",
        date: new Date("2026-07-05"),
        description: "Protecting businesses in the digital age.",
        capacity: 8,
        category: "Conference"
    },
    {
        name: "Yoga & Wellness Camp",
        organizer: "HealthFirst",
        location: "Rishikesh",
        date: new Date("2026-03-28"),
        description: "Mindfulness and wellness retreat.",
        capacity: 6,
        category: "Health"
    },
    {
        name: "Community Blood Donation Drive",
        organizer: "RedCross",
        location: "Kochi",
        date: new Date("2025-12-18"), // past event
        description: "Donate blood, save lives.",
        capacity: 12,
        category: "Community"
    },
    {
        name: "Online Python Bootcamp",
        organizer: "LearnCode",
        location: "Online",
        date: new Date("2026-02-10"),
        description: "Become a Python developer in 30 days.",
        capacity: 25,
        category: "Online"
    },
    {
        name: "Art & Painting Exhibition",
        organizer: "Creative Minds",
        location: "Jaipur",
        date: new Date("2026-08-14"),
        description: "Showcasing local artists.",
        capacity: 7,
        category: "Art"
    },
    {
        name: "Entrepreneur Networking Meetup",
        organizer: "Startup Circle",
        location: "Ahmedabad",
        date: new Date("2026-03-05"),
        description: "Connect with fellow entrepreneurs.",
        capacity: 9,
        category: "Networking"
    },
    {
        name: "Cloud Computing Seminar",
        organizer: "AWS User Group",
        location: "Bangalore",
        date: new Date("2026-09-09"),
        description: "Understanding cloud infrastructure.",
        capacity: 5,
        category: "Seminar"
    },
    {
        name: "Finance & Investment Workshop",
        organizer: "MoneyMatters",
        location: "Mumbai",
        date: new Date("2026-05-02"),
        description: "Smart investing strategies.",
        capacity: 10,
        category: "Business"
    },
    {
        name: "Robotics for Beginners",
        organizer: "STEM Academy",
        location: "Delhi",
        date: new Date("2026-06-22"),
        description: "Intro to robotics and automation.",
        capacity: 4,
        category: "Education"
    }
]

const importData = async () => {
    try {
        await db()
        await Event.deleteMany()
        await Event.insertMany(events)
        console.log("Data Inserted Successfully")
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

importData()