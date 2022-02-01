import React from 'react';
import FiltroForm from './FiltroForm';

export default function FiltroWeb({ filtrado, search }) {
  return (
    <div>
      <FiltroForm isMobile={false} filtrado={filtrado} search={search} />
    </div>
  );
}
