import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Pulling in your secure vault keys

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when you hit submit
    setLoading(true);
    setError(null);

    // This is the command that talks to the Supabase Auth engine we just enabled
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Authentication successful!", data);
      // We will add the redirect logic in the next step
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-neutral-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl">
        
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-widest text-neutral-100">ZAISAN</h2>
          <p className="mt-2 text-sm text-neutral-500 uppercase tracking-wide">Secure Terminal Access</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
              Identity
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
              Passphrase
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 text-sm font-semibold tracking-wide text-neutral-950 bg-emerald-700 rounded hover:bg-emerald-600 focus:outline-none disabled:opacity-50 transition-all duration-200"
          >
            {loading ? 'Authenticating...' : 'INITIALIZE SESSION'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;