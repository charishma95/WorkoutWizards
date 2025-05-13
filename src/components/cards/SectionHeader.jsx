import React from 'react';

const SectionHeader = ({ text }) => (
  <h2 style={styles.heading}>{text}</h2>
);

const styles = {
  heading: {
    fontSize: '1.6rem',
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
    borderBottom: '2px solid #ff6347',
    paddingBottom: '8px',
  },
};

export default SectionHeader;