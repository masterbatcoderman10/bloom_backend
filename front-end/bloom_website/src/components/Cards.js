import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out our TOP services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-10.png'
              text="Unravel the secrets of the market and speed up your growth."
              label='Market Analysis'
              path='/marketplace'
            />
            <CardItem
              src='images/img-12.png'
              text='Promote your product/services to your intended audience.'
              label='Digital Marketing'
              path='/marketplace'
            />
            <CardItem
              src='images/img-11.png'
              text="Improve productivity and optimize your team's performance"
              label='Team Management'
              path='/marketplace'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
