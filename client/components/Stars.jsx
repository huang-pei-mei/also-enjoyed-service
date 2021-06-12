import React from 'react';
import star from '../assets/star.png';
import starFilled from '../assets/starFilled.png';
import starHalf from '../assets/starHalf.png';

const Stars = (props) => {
  let styles = [
    {
      src: props.average < 1 ? props.average < 0.5 ? star : starHalf : starFilled,
    },
    {
      src: props.average < 2 ? props.average < 1.5 ? star : starHalf : starFilled,
    },
    {
      src: props.average < 3 ? props.average < 2.5 ? star : starHalf : starFilled,
    },
    {
      src: props.average < 4 ? props.average < 3.5 ? star : starHalf : starFilled,
    },
    {
      src: props.average < 5 ? props.average < 4.5 ? star : starHalf : starFilled,
    }
  ];
  return (
    <div className='also-enjoyed-stars'>
      {[0,1,2,3,4].map((starNum) => {
        return <img className='also-enjoyed-star' key={starNum} src={styles[starNum].src}></img>
      })}
    </div>
  );
}

export default Stars;