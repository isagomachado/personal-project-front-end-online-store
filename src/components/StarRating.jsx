import React from 'react';
import './StarRating.css';

const numberForDefaultArray = 5;

class StarRating extends React.Component {
  // Ref to help creating star rating https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
  constructor() {
    super();

    this.state = {
      defaultArray: [...Array(numberForDefaultArray)],
      currRating: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(givenRate) {
    this.setState({
      currRating: givenRate,
    });
  }

  render() {
    const { defaultArray, currRating } = this.state;

    return (
      <div className="star-rate">
        {defaultArray.map((star, index) => {
          index += 1;

          return (
            <button
              type="button"
              key={ index }
              className={ index <= currRating ? 'mybutton on' : 'mybutton off' }
              onClick={ () => this.handleClick(index) }
              data-testid={ `${index}-rating` }
            >
              <h3 className="star-rating">&#9733;</h3>
            </button>
          );
        })}
      </div>
    );
  }
}

export default StarRating;
