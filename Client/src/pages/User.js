/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function User() {
    const { username } = useParams();
    const [reviews, setReviews] = useState([]);
    const [editingId , setEditingId] = useState(null);
    const [editRating , setEditRating] = useState('');
    const [editComment , setEditComment] = useState('');

    useEffect(() => {
        const fetchReviews= async () => {
          const apidata = await getReviews();
          setReviews(apidata);
        };
        fetchReviews();
    }, [username]);
    
    const getReviews = async () => {
        const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/reviews?username=${username}`,
            headers: {
                accept: "application/json",
            },
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    // eslint-disable-next-line no-unreachable
    const deleteReview = (id) => {
    const options = {
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/deletereview/${id}`,
        headers: {
            accept: "application/json",
        }
    };
    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            setReviews(prevData => prevData.filter(review => review._id !== id));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    

    const updateReview = (id, newRating, newComment) => {
        const options = {
            method: "PATCH",
            url: `${process.env.REACT_APP_SERVER_URL}/api/moviereviews/updatereview/${id}`,
            headers: {
                accept: "application/json",
            },
            data: {
                rating: newRating,
                comment: newComment
            }
        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setReviews(prevData => prevData.map(review => review._id === id ? response.data : review));
                setEditingId(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <>
            <Navbar />
            <div className='reviewcon'>
                <div className='userreviews'>
                    <div className='reviews'>
                        {reviews.map((movie) => (
                            <div className='userreview' key={movie._id}>
                                {editingId === movie._id ? (
                                    <>
                                    <div className='usercont'>
                                        <div className='userrate'>
                                            {movie.title} &nbsp;&nbsp;&nbsp;&nbsp;<span className='ratee'>★ </span>
                                                <input
                                                className='ratinginput'
                                                    type='number'
                                                    value={editRating}
                                                    min={0}
                                                    max={10}
                                                    onChange={(e) => setEditRating(e.target.value)}
                                                />
                                        </div>
                                        <div className='buttons'>
                                            <button onClick={() => updateReview(movie._id, editRating, editComment)}> Save </button>
                                            <button onClick={() => setEditingId(null)}>Cancel</button>  
                                        </div>
                                    </div>
                                    <input
                                        className='commentinput'
                                        type='text'
                                        value={editComment}
                                        onChange={(e) => setEditComment(e.target.value)}/>
                                </>
                                ) : (
                                    <>
                                        <div className='usercont'>
                                            <div className='userrate'>
                                                {movie.title} &nbsp;&nbsp;&nbsp;&nbsp;<span className='ratee'>★ </span>{movie.rating}
                                            </div>
                                            <div className='buttons'>
                                                <button  onClick={() => {
                                                    setEditingId(movie._id);
                                                    setEditRating(movie.rating);
                                                    setEditComment(movie.comment)
                                                }}>Edit</button>
                                                <button padding onClick={() => deleteReview(movie._id)}>Delete</button>
                                            </div>
                                        </div>
                                        <div className='comment'>{movie.comment}</div>
                                    </>
                                )}
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
