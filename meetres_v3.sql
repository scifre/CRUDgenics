--
-- PostgreSQL database dump
--

\restrict rf3LcwbWSyw0MKZOfxT2QJhKnUfBQxCCpVzridBHOcdjx9EHd63APvCVWUNcSxl

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: reservations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    room_no integer NOT NULL,
    reserved_by character(6) NOT NULL,
    reservation_date date NOT NULL,
    reserved_from time without time zone NOT NULL,
    reserved_to time without time zone NOT NULL,
    reserved_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    emp_id character(6) NOT NULL,
    name character varying(100) NOT NULL,
    department character varying(100) NOT NULL,
    designation character varying(100) NOT NULL,
    password text NOT NULL
);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reservations (id, room_no, reserved_by, reservation_date, reserved_from, reserved_to, reserved_on) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (emp_id, name, department, designation, password) FROM stdin;
INT783	Ayush Yadav	POD1	Tech Intern	a
INT775	Kanika Malhotra	POD2	Product Intern	k
INT774	Panshul Senapati	POD6	Product Intern	p
CG1015	Shreya Jain	POD4	Tech Intern	s
INT782	Aditya Gahlaut	Backend	Tech Intern	a
INT176	RS Bhuvan	Backend	Tech Intern	b
INT787	Prakhar Saxena	Backend	Tech Intern	p
INT789	Jatin Kumar	Backend	Tech Intern	j
INT779	Mihir Kumar	Backend	Tech Intern	m
INT780	Jhunjhun Yadav	Backend	Tech Intern	j
INT786	Harsh Agrawal	Backend	Tech Intern	h
INT781	Kanha Tayal	Backend	Tech Intern	k
INT788	Shubham Sangwan	Frontend	Tech Intern	s
INT785	Dilesh Bisen	Backend	Tech Intern	d
\.


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reservations_id_seq', 4, true);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (emp_id);


--
-- Name: reservations fk_reserved_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_reserved_by FOREIGN KEY (reserved_by) REFERENCES public.users(emp_id);


--
-- PostgreSQL database dump complete
--

\unrestrict rf3LcwbWSyw0MKZOfxT2QJhKnUfBQxCCpVzridBHOcdjx9EHd63APvCVWUNcSxl

