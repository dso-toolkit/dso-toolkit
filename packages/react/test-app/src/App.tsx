import React, { useState } from 'react';
import { DsoAlert, DsoDatePicker } from '@dso-toolkit/react';

function App() {
  const [date, setDate] = useState<any>();

  return (
    <>
      <DsoAlert status="danger">
        Test
      </DsoAlert>
      <div />
      <DsoDatePicker value={date?.value} onDateChange={e => setDate(e.detail)} />
      <pre>{JSON.stringify(date ?? 'change date')}</pre>
    </>
  );
}

export default App;
