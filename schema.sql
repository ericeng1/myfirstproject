-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.submissions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  first_name text,
  last_name text,
  email text,
  image_url text,
  comment text,
  created_at timestamp with time zone,
  submission_id bigint NOT NULL UNIQUE,
  CONSTRAINT submissions_pkey PRIMARY KEY (id)
);