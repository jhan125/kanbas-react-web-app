import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <img src="/images/webDevelopment.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5610/Home">
              CS5610 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
              Web Development
            </p>
            <Link to="/Kanbas/Courses/5610/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <img src="/images/mobileAppDevelopment.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5520/Home">
              CS5520 Mobile Application Development
            </Link>
            <p className="wd-dashboard-course-title">
              Mobile Application Development
            </p>
            <Link to="/Kanbas/Courses/5520/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <img src="/images/distributedSystem.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/6650/Home">
              CS6650 Scalable Distributed Systems
            </Link>
            <p className="wd-dashboard-course-title">
            Scalable Distributed Systems
            </p>
            <Link to="/Kanbas/Courses/6650/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <img src="/images/computerNetworking.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5700/Home">
              CS5700 Computer Networking
            </Link>
            <p className="wd-dashboard-course-title">
            Computer Networking
            </p>
            <Link to="/Kanbas/Courses/5700/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <img src="/images/nlp.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/6120/Home">
              CS6120 Natural Language Processing
            </Link>
            <p className="wd-dashboard-course-title">
              Natural Language Processing
            </p>
            <Link to="/Kanbas/Courses/6120/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <img src="/images/algorithms.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5800/Home">
              CS5800 Algorithms
            </Link>
            <p className="wd-dashboard-course-title">
              Algorithms
            </p>
            <Link to="/Kanbas/Courses/5800/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
        {/* Course 8 */}
        <div className="wd-dashboard-course">
          <img src="/images/machineLearning.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/6140/Home">
              CS6140 Machine Learning
            </Link>
            <p className="wd-dashboard-course-title">
              Machine Learning
            </p>
            <Link to="/Kanbas/Courses/6140/Home"> Go </Link>
            <hr color="lightgray" />
            <br />
          </div>
        </div>
      
      </div>
    </div>
  );
}