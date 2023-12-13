import './NotFound.css'; // You can create a separate CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <img
          src="https://media.giphy.com/media/3o6Zt481isNVuQIhPW/giphy.gif" 
          alt="Confused Cat"
          className="not-found-image"
        />
        <p> {` Oops! Looks like you're lost in the cat-astrophe!`} </p>
        <p> { `Don't worry, our team of highly trained cats is on the case. `}</p>
        <p>
          Meanwhile, you can try scratching your head or click your paws on the
          navigation links above.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
