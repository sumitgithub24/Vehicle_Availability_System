package com.kpit.vehicleavailability.controller;

import com.kpit.vehicleavailability.model.User;
import com.kpit.vehicleavailability.service.UserService;

// import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/login")
public class LoginController extends HttpServlet {

    private UserService userService;

    @Override
    public void init() {
        userService = new UserService();
    }

    /*
     * @Override
     * protected void doPost(HttpServletRequest request, HttpServletResponse
     * response) throws IOException {
     * String username = request.getParameter("username");
     * String password = request.getParameter("password");
     * 
     * User user = userService.loginUser(username, password);
     * 
     * response.setContentType("text/plain");
     */
    /*
     * if (user != null) {
     * HttpSession session = request.getSession();
     * session.setAttribute("user", user);
     * response.getWriter().write("Login successful! Welcome " +
     * user.getFirstName());
     * }
     * 
     * if (user != null) {
     * HttpSession session = request.getSession();
     * session.setAttribute("user", user);
     * session.setAttribute("isDealer", user.isDealer()); // ✅ this sets the boolean
     * in session
     * response.getWriter().write("Login successful! Welcome " +
     * user.getFirstName());
     * }
     * 
     * else {
     * response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
     * response.getWriter().write("Invalid username or password.");
     * }
     * }
     */

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User user = userService.loginUser(username, password);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (user != null) {
            // Save user in session
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            session.setAttribute("isDealer", user.isDealer());

            // Build JSON response
            String jsonResponse = String.format(
                    "{ \"firstName\": \"%s\", \"lastName\": \"%s\", \"username\": \"%s\", \"email\": \"%s\", \"isDealer\": %b }",
                    user.getFirstName(), user.getLastName(), user.getUsername(), user.getEmail(), user.isDealer());

            response.getWriter().write(jsonResponse);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Invalid username or password.\"}");
        }
    }

}
