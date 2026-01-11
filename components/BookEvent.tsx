'use client'

import { useState } from "react";

const BookEvent = () => {
    const [email , setEmail] = useState('');
    const [submitted , setSubmitted] = useState(false);
    const handleSubmit = (e : React.FormEvent) => {
            e.preventDefault();
            setTimeout(()=>{
                setSubmitted(true)
            }, 1000)
    }
  return (
    <div id='book-event'>
        {
            submitted ? (
                    <p className="text-sm">Thanks for sigining Up!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email"value={email} 
                        onChange={(e) => setEmail(e.target.value) }
                        placeholder="Enter you email address"
                        id="email" 
                        />
                    </div>

                    <button type="submit" className="button-submit">SignUp</button>
                </form>
            )
        }

    </div>
  )
}

export default BookEvent