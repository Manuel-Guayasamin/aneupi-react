import React, { useState } from 'react';
import '../../App.css';  // Asegúrate de tener un CSS adecuado para las estrellas

const Rating = ({ rating }) => {
    const [hover, setHover] = useState(0);  // Estado para saber sobre qué estrella está el mouse

    const ratingMessages = {
        1: "Calificación: 1/5 - No muy bueno",
        2: "Calificación: 2/5 - Regular",
        3: "Calificación: 3/5 - Bueno",
        4: "Calificación: 4/5 - Muy Bueno",
        5: "Calificación: 5/5 - Excelente"
    };

    return (
        <div className="rating" onMouseLeave={() => setHover(0)}>
            {hover !== 0 && (
                <div className="rating-tooltip">{ratingMessages[hover]}</div>
            )}
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    className={star <= rating ? 'filled-star' : 'empty-star'}
                    onMouseEnter={() => setHover(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default Rating;