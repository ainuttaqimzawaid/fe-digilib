import { useState } from "react";

const StarRating = ({ value = 0, onChange, readOnly = false }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star, index) => {
        const filled = hover ? star <= hover : star <= value;
        return (
          readOnly ? <span
            key={index}
            className={`cursor-pointer text-2xl ${filled ? "text-yellow-400" : "text-gray-300"
              }`}>
            ★
          </span> : <span
            key={index}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className={`cursor-pointer text-2xl ${filled ? "text-yellow-400" : "text-gray-300"
              }`}
          >
            ★
          </span>

        );
      })}
    </div>
  );
};

export default StarRating;
