
# Case study for full stack developer 

### [Linkdein](https://linkedin.com/in/sudo-abhinav/)
### [Github](https://github.com/sudo-abhinav)
----------------------

### Problem Statement: Flight Status and Notifications

### Description: Develop a system to provide real-time flight status updates and notifications to passengers.

#### Tech Stack
   - FrontEnd : *React* ,*axios* , *Tailwind Css*.
   - Backend : *Flask* , *Twillio* , *SQLAlchemy* , *SMTP*,
   
## API Reference

#### Test Route

```http
  GET /api/test
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` |  'Welcome User..'  |


#### Get all Flight Status

```http
  GET /api/flight
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | it will gives you all filght update  |

#### Post Route For Geeting Notification

```http
  POST /api/subscribe
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `flight_id , email ,phone`      | `string , num , string` | **Required**. all Field is required for Getting Notification on Mobile and Mail |




![Status](image.png)
![notification](image-1.png)
![successfull](image-2.png)
![backButton](image-3.png)