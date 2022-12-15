import {Link} from "react-router-dom";
function Activate() {
    return(
        <div className = "activate">
            <h1>Please Check Your Email and Activate Your Account.</h1>
            <h1>After Activating Your Account, Please - <Link to='/login'>Log in</Link></h1>
        </div>
    );
}
export default Activate;