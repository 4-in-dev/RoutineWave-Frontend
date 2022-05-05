import React from 'react'


const LoginPage = (props) => {
  return (
    <form>
      <div >
        <div >
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="name">Last Name</label>
          <input
          />
        </div>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default LoginPage;
