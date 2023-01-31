import React, { useState } from 'react';

const RegionSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState('eun1');

  return (
    <>
      <select onChange={e => setSelectedRegion(e.target.value)}>
        <option value="eun1">EUNE</option>
        <option value="euw1">EUW</option>
        <option value="na1">NA</option>
      </select>
      <br />
      <br />
      <h3>API Call String:</h3>
      <p>{APICallString(selectedRegion)}</p>
    </>
  );
};

export default RegionSearch;