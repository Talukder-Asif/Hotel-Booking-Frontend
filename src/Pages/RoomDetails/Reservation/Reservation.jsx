import PropTypes from "prop-types";

const Reservation = ({ unAvailable, pricePerNight, _id, bedFor }) => {
  console.log(unAvailable);
  return <div>LetsResurved</div>;
};

Reservation.propTypes = {
  unAvailable: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
    .isRequired,
  pricePerNight: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  bedFor: PropTypes.number.isRequired,
};

export default Reservation;
