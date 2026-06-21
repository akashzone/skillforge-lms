import React from 'react'
import { useAuth } from "../../context/AuthContext";
import api from '../../api/api';

const UploadLecture = () => {
    const { token } = useAuth();

    const title = "What is React?"
    const 

    const handleSubmit = async () => {
        const response = await api.post(
            `/lessons/:lessonId/video`,
            {
                title,
                order,
                course: id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="lecture" />
                <button className='' type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UploadLecture