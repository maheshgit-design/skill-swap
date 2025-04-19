// Your SkillSwap App code goes here. Let me know to insert it.
import React, { useState } from "react";

const usersDB = [
  {
    name: "Helen Parker",
    email: "helen@example.com",
    password: "password123",
    teach: ["Spanish", "Painting"],
    learn: ["Graphic Design", "Photography"],
  },
  {
    name: "Adam Jones",
    email: "adam@example.com",
    password: "password456",
    teach: ["Photography", "Cooking"],
    learn: ["Spanish"],
  },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [chats, setChats] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [coins, setCoins] = useState(25);

  const [isLogin, setIsLogin] = useState(true);
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    teach: "",
    learn: "",
  });

  const login = () => {
    const existing = usersDB.find(
      (u) => u.email === auth.email && u.password === auth.password
    );
    if (existing) {
      setUser(existing);
      setCoins(25);
    } else {
      alert("Invalid credentials");
    }
  };

  const signUp = () => {
    const newUser = {
      ...profile,
      teach: profile.teach.split(",").map((s) => s.trim()),
      learn: profile.learn.split(",").map((s) => s.trim()),
    };
    setUser(newUser);
    setCoins(25);
  };

  const sendRequest = (matchedUser) => {
    setConnections([...connections, matchedUser]);
  };

  const sendMessage = (to, msg) => {
    if (msg.trim() !== "") {
      setChats([...chats, { to, msg }]);
    }
  };

  const bookSession = (cost = 50) => {
    if (coins >= cost) setCoins(coins - cost);
  };

  const referFriend = (email) => {
    if (email.trim() !== "") {
      setReferrals([...referrals, email]);
      setCoins(coins + 10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-100 p-4 max-w-md mx-auto">
      <img src="/logo.png" alt="Logo" className="w-20 mx-auto mb-4 rounded-full shadow" />
      {!user ? (
        <div className="bg-white p-4 rounded-xl shadow">
          {isLogin ? (
            <>
              <h2 className="text-lg font-bold mb-2">Login</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-2 border rounded"
                onChange={(e) => setAuth({ ...auth, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              />
              <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={login}>
                Login
              </button>
              <p
                className="text-center text-sm text-blue-700 mt-2 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Don’t have an account? Sign up
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold mb-2">Sign Up</h2>
              <input
                placeholder="Name"
                className="w-full p-2 mb-2 border rounded"
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <input
                placeholder="Email"
                className="w-full p-2 mb-2 border rounded"
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-2 border rounded"
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              />
              <input
                placeholder="Skills I can teach (comma separated)"
                className="w-full p-2 mb-2 border rounded"
                onChange={(e) => setProfile({ ...profile, teach: e.target.value })}
              />
              <input
                placeholder="Skills I want to learn (comma separated)"
                className="w-full p-2 mb-4 border rounded"
                onChange={(e) => setProfile({ ...profile, learn: e.target.value })}
              />
              <button className="w-full bg-green-500 text-white p-2 rounded" onClick={signUp}>
                Sign Up
              </button>
              <p
                className="text-center text-sm text-blue-700 mt-2 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Already have an account? Login
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <img src="/profile.jpg" alt="Profile" className="w-16 h-16 mx-auto rounded-full mb-2 shadow" />
            <h2 className="text-center text-xl font-bold">{user.name}</h2>
            <p className="text-center text-sm text-gray-600">{user.email}</p>
            <p className="text-sm mt-2"><strong>Teaches:</strong> {user.teach.join(", ")}</p>
            <p className="text-sm"><strong>Wants to learn:</strong> {user.learn.join(", ")}</p>
            <p className="text-sm mt-1"><strong>SkillCoins:</strong> {coins}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h3 className="font-semibold mb-2">Skill Matches</h3>
            {usersDB.filter((u) => u.email !== user.email).map((u, i) => (
              <div key={i} className="p-2 mb-2 border rounded">
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm">Teaches: {u.teach.join(", ")}</p>
                <p className="text-sm">Wants: {u.learn.join(", ")}</p>
                <button
                  className="bg-purple-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => sendRequest(u)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h3 className="font-semibold mb-2">Referrals</h3>
            <input
              placeholder="Friend’s email"
              className="w-full p-2 mb-2 border rounded"
              onKeyDown={(e) => {
                if (e.key === "Enter") referFriend(e.target.value);
              }}
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h3 className="font-semibold mb-2">Book Session</h3>
            <button
              className="bg-indigo-600 text-white w-full p-2 rounded"
              onClick={bookSession}
            >
              Book for 50 SkillCoins
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h3 className="font-semibold mb-2">Chats</h3>
            {connections.map((conn, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold">Chat with {conn.name}</p>
                <textarea
                  className="w-full p-2 border rounded mt-1"
                  rows={2}
                  placeholder="Type a message"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(conn.name, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

