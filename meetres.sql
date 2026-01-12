--
-- PostgreSQL database dump
--

\restrict pLbf9HjtUcxO3pg8Po38DecBKeODTmkN9B9MxYLz24vDdbCAb2WIy8sQspg1gaT

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: reservations; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.reservations OWNER TO admin;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO admin;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    emp_id character(6) NOT NULL,
    name character varying(100) NOT NULL,
    department character varying(100) NOT NULL,
    designation character varying(100) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reservations (id, room_no, reserved_by, reservation_date, reserved_from, reserved_to, reserved_on) FROM stdin;
1	1	INT002	2026-01-14	11:00:00	12:00:00	2026-01-12 00:00:00
2	1	INT003	2026-01-14	14:00:00	15:00:00	2026-01-12 00:00:00
3	1	INT004	2026-01-14	10:00:00	11:00:00	2026-01-12 13:50:25.227359
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (emp_id, name, department, designation, password) FROM stdin;
INT001	Ayush Yadav	POD1	Tech Intern	a
INT002	Kanika Malhotra	POD2	Product Intern	k
INT003	Panshul Senapati	POD6	Product Intern	p
INT004	Shreya Jain	POD4	Tech Intern	s
\.


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservations_id_seq', 3, true);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (emp_id);


--
-- Name: reservations fk_reserved_by; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_reserved_by FOREIGN KEY (reserved_by) REFERENCES public.users(emp_id);


--
-- PostgreSQL database dump complete
--

\unrestrict pLbf9HjtUcxO3pg8Po38DecBKeODTmkN9B9MxYLz24vDdbCAb2WIy8sQspg1gaT

