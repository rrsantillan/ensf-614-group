DROP DATABASE IF EXISTS ensf_614;
CREATE DATABASE ensf_614;
USE ensf_614;

DROP TABLE IF EXISTS tblUser;
CREATE TABLE tblUser (
	USERID 			INT AUTO_INCREMENT PRIMARY KEY,
	USERNAME			VARCHAR(25) NOT null,
	PASSWORD			VARCHAR(25) NOT null,
	PROFILE 			VARCHAR(25) NOT NULL,
	EMAIL				VARCHAR(25) NOT NULL,
	YEARLYPROMO 	BOOLEAN,
	PROMOCODE 		varchar(5)		
);


DROP TABLE IF EXISTS tblAirplane;
CREATE TABLE tblAirplane (
	AIRPLANEVIN 	VARCHAR(25) NOT NULL PRIMARY KEY,
	MODEL 			VARCHAR(25) NOT NULL,
   ROWCNT 			INT,
   COLCNT			INT
);

	
DROP TABLE IF EXISTS tblFlight;
CREATE TABLE tblFlight (    
	FLIGHTID		INT AUTO_INCREMENT PRIMARY KEY,
	AIRPLANEID 	VARCHAR(25) NOT NULL,
	ORIGIN			varchar(25) NOT null,
	DESTINATION	 	varchar(25) NOT null,
	DEPARTURETIME	TIMESTAMP,
	ARRIVALTIME		TIMESTAMP,
	FOREIGN KEY (AIRPLANEID) REFERENCES tblAirplane(AIRPLANEVIN)
	
);

DROP TABLE IF EXISTS tblTicket; 
CREATE TABLE tblTicket (
	TICKEDID       INT AUTO_INCREMENT PRIMARY KEY,
	USERNAME			varchar(25) NOT null,
	FLIGHTID			INT,
	SEATNUMBER		varchar(25) NOT null,
	SEATTYPE			INT,
	PRICE 			FLOAT NOT NULL, 
	INSURANCE 		VARCHAR(25) Not NULL,
	FOREIGN KEY (FLIGHTID) REFERENCES tblFlight(FLIGHTID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tblCrew; 
CREATE TABLE tblCrew (
	CREWID	   	INT AUTO_INCREMENT PRIMARY KEY,
	FNAME				VARCHAR(25) NOT NULL,
	LNAME			VARCHAR(25) NOT NULL,
	POSITION			VARCHAR(25) NOT NULL
);

DROP TABLE IF EXISTS tblAssignedCrew; 
CREATE TABLE tblAssignedCrew (
	CREWID 			INT,		
	FLIGHTID			varchar(25) NOT NULL,
	FOREIGN KEY (CREWID) REFERENCES tblCrew(CREWID)
);

INSERT INTO tblUser ( USERNAME, PASSWORD, PROFILE, EMAIL, YEARLYPROMO, PROMOCODE)
VALUES
( 'Kate', 'kate', 'AGENT', 'braden@gmail.com', 0, ''),
( 'Jack', 'jack', 'ADMIN', 'fred@gmail.com', 1, ''),
( 'James', 'james', 'REGUSER', 'bob@gmail.com', 0, '50OFF');


INSERT INTO tblAirplane (AIRPLANEVIN, MODEL, ROWCNT, COLCNT)
VALUES
('AVX420','BOEING 747', 5,5),
('CCG358', 'BOEING 777',5,5),
('MRT222', 'AIRBUS a320',5,5);


INSERT INTO tblFlight ( AIRPLANEID, ORIGIN, DESTINATION, DEPARTURETIME, ARRIVALTIME)
VALUES	
( 'AVX420', 'YYC', 'YVR',	'2023-11-12', '2023-11-13'),
( 'MRT222', 'YYC', 'YVR',	'2023-11-12', '2023-11-14'),
( 'AVX420', 'YYC', 'YVR',	'2023-11-13', '2023-11-16');

INSERT INTO tblTicket ( USERNAME, FLIGHTID, SEATNUMBER, SEATTYPE, PRICE, INSURANCE)
VALUES
( 'Kate', 1, 'A1', 1, '400', 'Yes'),
( 'Jack', 1, 'B1', 2, '300', 'Yes'),
( 'James', 2, 'A3', 2, '300', 'Yes'),
( 'Guest', 3, 'C1', 3, '200', 'No'),
( 'Guest', 2, 'D4', 4, '100', 'No');


INSERT INTO tblCrew( FNAME, LNAME, POSITION)
VALUES
( 'Frank', 'Bird', 'PILOT'),
( 'Greg', 'Bird', 'ATTENDANT'),
( 'Jon', 'Smith', 'ATTENDANT'),
( 'Nancy', 'Drew', 'PILOT'),
( 'Bob', 'Tim', 'ATTENDANT');

INSERT INTO tblAssignedCrew(FLIGHTID, CREWID)
VALUES
(1, 1),
(1, 2);

 




