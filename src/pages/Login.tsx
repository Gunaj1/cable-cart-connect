import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this line

const supabase = createClient(
  'https://hddvrvhuemdqahfhgsnf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZHZydmh1ZW1kcWFoZmhnc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDQ0MDIsImV4cCI6MjA2OTgyMDQwMn0.c8-0Aik8Si2tcP2jbs7NWs9ruMaNwWjGJI8MpswCDwA'
);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <-- Hook for navigation

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      navigate('/'); // 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
