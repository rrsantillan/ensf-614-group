DROP DATABASE IF EXISTS ensf_614;
CREATE DATABASE ensf_614;
USE ensf_614;

DROP TABLE IF EXISTS usertable;
CREATE TABLE usertable (
	USERNAME			varchar(25) NOT null,
	PASSWORD			varchar(25) NOT null,
	PROFILE 			varchar(25) NOT NULL,
	EMAIL				varchar(25) NOT NULL,
	DOB				TIMESTAMP,				
	primary key (USERNAME)
);
		
DROP TABLE IF EXISTS FLIGHTS;
CREATE TABLE flights (    
	FLIGHTID			varchar(25) NOT null,
	SOURCE			varchar(25) NOT null,
	DESTINATION		varchar(25) NOT null,
	DEPARTURE		TIMESTAMP,
	LANDING 			TIMESTAMP,				
	primary key (FLIGHTID)  
);

DROP TABLE IF EXISTS REGISTEREDTICKETS; 
CREATE TABLE REGISTEREDTICKETS (
	USERNAME			varchar(25) NOT null,
	FLIGHTID			varchar(25) NOT null,
	SEATNUMBER			varchar(25) NOT null,
	primary key (FlightID, SEATNUMBER)  
);

DROP TABLE IF EXISTS CREW; 
CREATE TABLE CREW (
	FNAME			varchar(25) NOT null,
	LASTNAME			varchar(25) NOT null,
	CREWID			varchar(25) NOT null,
	primary key (CREWID)
);

DROP TABLE IF EXISTS ASSIGNEDCREW; 
CREATE TABLE ASSIGNEDCREW (
	FLIGHTID			varchar(25) NOT null,
	CREWID			varchar(25) NOT null,
	primary key (CREWID)  
);




INSERT INTO USERTABLE (USERNAME, PASSWORD, PROFILE, EMAIL, DOB)
VALUES
('Braden', '1234', 'Agent', 'braden@gmail.com',	'1996-10-17'),
('Fred', 'fred', 'Admin', 'fred@gmail.com',	'1990-04-19'),
('Bob', 'bob', 'REGUSER', 'bob@gmail.com',	'1999-09-12');


INSERT INTO FLIGHTS (FLIGHTID, SOURCE, DESTINATION, DEPARTURE, LANDING)
VALUES
('1', 'YYC', 'YVR',	'2023-11-12', '2023-11-13'),
('2', 'YYC', 'YVR',	'2023-11-12', '2023-11-14'),
('3', 'YYC', 'YVR',	'2023-11-13', '2023-11-16');

INSERT INTO registeredtickets (USERNAME, FLIGHTID, SEATNUMBER)
VALUES
('Braden', '1', 'A1'),
('Guest', '1', 'B1'),
('Guest', '1', 'A3'),
('Guest', '1', 'C1'),
('Guest', '1', 'D4');




INSERT INTO CREW(FNAME, LASTNAME, CREWID)
VALUES
('Larry', 'Bird', 'A001'),
('Greg', 'Bird', 'A002'),
('Jon', 'Smith', 'A003'),
('Nancy', 'Drew', 'A004'),
('Bob', 'Tim', 'A005');

INSERT INTO ASSIGNEDCREW(FLIGHTID, CREWID)
VALUES
('1', 'A001'),
('1', 'A002'),





