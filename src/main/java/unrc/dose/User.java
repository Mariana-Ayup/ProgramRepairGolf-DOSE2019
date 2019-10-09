/*
* == Schema Info
*
* Table name: users
*
*  id              :integer(11)    not null, primary key
*  username        :varchar(20)    not null,
*  password        :varchar(20)    not null,
*  email_address   :varchar(50)    not null,
*  admin           BOOLEAN not null default 0
*  unique(username),
*  unique(email_address)
*
**/

package unrc.dose;

import org.javalite.activejdbc.Model;
import org.javalite.activejdbc.LazyList;


public class User extends Model {
	static final Integer MIN_VALUE = 6;
	static final Integer MAX_VALUE = 20;
	static final String ID = "id";
	static final String USERNAME = "username";
	static final String PASSWORD = "password";
	static final String EMAIL = "email_address";
	static final String ADMIN = "admin";

	/**
	* @param name : username that user wants: String
	* @return value that represents if username already exits: Boolean 
	*/
	public static Boolean searchUserByUsername (String name) {
		User user = User.findFirst(USERNAME + " = ?", name);

		return (user == null);
	}

	/**
	* @param email : username that user wants: String
	* @return value that represents if username already exits: Boolean 
	*/
	public static Boolean searchUserByEmail (String email) {
		User user = User.findFirst(EMAIL + " = ?", email);

		return (user == null);
	}

	/**
    * @param name : username that user charge: String
    * @param pass : password that user charge: String
    * @param email : email_address that user charge: String
    * @param admin : if user has privileges of admin users: Boolean
    * @return user created: User 
    */
	public static User set (String name, String pass, String email, Boolean admin) {
		User user = new User();
		
		user.load(user, name, pass, email, admin);
		
		return user;

	}

    /**
    * @return id of a user: Integer
    */
	public Integer getId() {
		return this.getInteger(ID);

	}

    /**
    * @return username of the user: String
    */
	public String getName() {
		return this.getString(USERNAME);

	}

    /**
    * @return password of the user: String
    */
	public String getPass() {
		return this.getString(PASSWORD);

	}

    /**
    * @return email_address of the user: String
    */
	public String getEmail() {
		return this.getString(EMAIL);

	}

    /**
    * @return represents if user has privileges of admin: Boolean
    */
	public Boolean getAdmin() {
		return this.getBoolean(ADMIN);

	}

    /**
    * @param u : user: User
    * @param name : username that user charge: String
    * @param pass : password that user charge: String
    * @param email : email_address that user charge: String
    * @param admin : if user has privileges of admin users: Boolean
    */
	private void load(User u, String name, String pass, String email, Boolean admin) {
		u.set(USERNAME, name);
		u.set(PASSWORD, pass);
		u.set(EMAIL, email);
		u.set(ADMIN, admin);
	}



	/**.
	 * Method that given un email and new password returns a boolean ,
	 * if the password has been modified successfully
     * @param email : the email of the user who wants to change the password
	 * @param  pass : the new password
	 * @return A boolean if the password has been modified successfully
	 */
	public static Boolean updatePassword(final String email,
		final String pass) {
		User user = User.findFirst("email_address = ?", email);
		if (user != null) {

		String password = user.getString("Password");
			if (password.equals(pass)
				|| (pass.length() <= MIN_VALUE
				|| pass.length() >= MAX_VALUE)) {
				return false;
			} else {
				user.set("password", pass);
				user.saveIt();
			return true;
			}
		}
		return false;
	}

	/**.
	 * Method that given un email and new username returns a boolean ,
	 * if the username  has been modified successfully
     * @param email : the email of the user who wants to change the username
	 * @param  username : the new username
     * @return A boolean if the username has been modified successfully
	 */

	public static Boolean updateUsername(final String email,
		final String username) {
		User user = User.findFirst("email_address = ?", email);
		if (user != null) {
			user.set("username", username);
			user.saveIt();
			return true;
		}
		return false;
	}


	/**.
	 * Method that given un email and  username returns,
	 * a boolean if the user exists
     * @param email :  with which you want to search for the user
	 * @param  username : with which you want to search for the user
     * @return A boolean if the username has been found
	 */
	public static Boolean searchUsernameAndEmail(final String email,
		final String username) {
		User user = User.findFirst("email_address = ? and username = ?",
			email, username);

		return (user == null);
	}




}
