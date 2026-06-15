import React from 'react'
import CourseCard from '../../components/CourseCard'

const MyCourses = () => {
    return (
        <div>
            <h1>My Courses</h1>
            <CourseCard
                title="Advanced JavaScript Essentials"
                price={899}
                description="Master modern JavaScript concepts including closures, prototypes, async programming, event loop, ES6+ features, and performance optimization."
                category="Programming"
                level="Advanced"
            ></CourseCard>
        </div >
    )
}

export default MyCourses