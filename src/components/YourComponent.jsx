import React from 'react';
import styled from 'styled-components';
import { getCdnUrl } from '../utils/getCdnUrl';

const BackgroundContainer = styled.div`
  background-image: url('${getCdnUrl('images/bg.png')}');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Adjust as needed */
`;

const TimeDoctorImage = styled.img`
  width: 100%; /* Adjust as needed */
  height: auto; /* Maintain aspect ratio */
`;

const YourComponent = () => {
  return (
    <BackgroundContainer>
      <TimeDoctorImage src={getCdnUrl('images/time-doctor.webp')} alt="Time Doctor" />
      {/* Your content here */}
    </BackgroundContainer>
  );
};

export default YourComponent; 