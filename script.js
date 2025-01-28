document.getElementById('callForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const data = {
      campaign_id: document.getElementById('campaign_id').value,
      phone_number: document.getElementById('phone_number').value,
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      external_id: document.getElementById('external_id').value,
      test: document.getElementById('test').checked,
      input_fields: {
          debt_collection_company: document.getElementById('debt_collection_company').value,
          total_debt: document.getElementById('total_debt').value
      }
  };

  try {
      const response = await fetch('https://api.domu.ai/calls', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkNMVDhmMDVlZjJmMTJiZjBlZTM1OGJlNDA4Mzg1OTBhYzRjIiwicHJvdmlkZXIiOiJkb211IiwicHJvZHVjdCI6IioiLCJlbnZpcm9ubWVudCI6InByb2QiLCJ1c2VybmFtZSI6ImxhdXJhIiwiaWF0IjoxNzI5NjA4MTc1LCJleHAiOjIwNDUxODQxNzV9.jx24eSkkB_0EiUMvqemiQQlz-WyLdAzaRik1j3kgB10',
              'Domu-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkNMVDhmMDVlZjJmMTJiZjBlZTM1OGJlNDA4Mzg1OTBhYzRjIiwicHJvdmlkZXIiOiJkb211IiwicHJvZHVjdCI6IioiLCJlbnZpcm9ubWVudCI6InByb2QiLCJ1c2VybmFtZSI6ImxhdXJhIiwiaWF0IjoxNzI5NjA4MTc1LCJleHAiOjIwNDUxODQxNzV9.jx24eSkkB_0EiUMvqemiQQlz-WyLdAzaRik1j3kgB10',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          const result = await response.json();
          alert('Call generated successfully!');
          console.log('Response:', result);
          // Limpiar el formulario después de un envío exitoso
          e.target.reset();
          // Restaurar el valor por defecto del campaign_id y el checkbox
          document.getElementById('campaign_id').value = 'CMP81f50d25a428a40fb048bfa1836924a8';
          document.getElementById('test').checked = true;
      } else {
          alert('Error generating call');
          console.error('Error response:', await response.text());
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
  }
});