import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import BudgetDashboard from './components/BudgetDashboard';

function App() {
const [session, setSession] = useState(null);
const [isChecking, setIsChecking] = useState(true);

useEffect(() => {
supabase.auth.getSession().then(({ data: { session } }) => {
setSession(session);
setIsChecking(false);
});

}, []);

if (isChecking) {
return <div className="min-h-screen bg-neutral-950"></div>;
}

return (
<>
{!session ? (
<Login />
) : (
<BudgetDashboard />
)}
</>
);
}

export default App;