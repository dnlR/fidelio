fidelio_db_dev password: '6o3ZcjznMaG9vXPM'
fidelio_db_dev url: 'https://jvavmszzitymsnzrvhth.supabase.co'
fidelio_db_dev api key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YXZtc3p6aXR5bXNuenJ2aHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1NjIwMTQsImV4cCI6MTk4NzEzODAxNH0.o3vYsZ5_hUFM2lpX3jgx_1IwILxhUfok3kAzjzPgz2A'


CREATE TABLE public.zip_codes (
	id serial4 NOT NULL,
	country_code varchar NULL,
	country varchar NULL,
	zip_code varchar NULL,
	city varchar NULL,
	region varchar NULL,
	province varchar NULL,
	lat varchar NULL,
	lng varchar NULL,
	CONSTRAINT zip_codes_pk PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id uuid NOT NULL,
	"name" varchar NULL,
	address varchar NULL,
	zipcode int4 NULL,
	photo varchar NULL,
	phone varchar NULL,
	email varchar NULL,
	default_role char(1) NULL,
	tos_accepted bool NULL,
	tos_accepted_date timestamp NULL,
	active bool NULL,
	actual_location point NULL,
	actual_location_date timestamp NULL,
	last_login_date timestamp NULL,
	modification_date timestamp NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_fk FOREIGN KEY (zipcode) REFERENCES public.zip_codes(id)
);

CREATE TABLE public.companies (
	id serial4 NOT NULL,
	user_id uuid NOT NULL,
	"name" varchar NULL,
	"password" varchar NULL,
	nif varchar NULL,
	zip_code_id int4 NULL,
	phone varchar NULL,
	email varchar NULL,
	logo varchar NULL,
	city varchar NULL,
	region varchar NULL,
	country varchar NULL,
	address varchar NULL,
	active bool NULL,
	modification_date timestamp NULL,
	modification_user_id uuid NULL,
	CONSTRAINT companies_pk PRIMARY KEY (id),
	CONSTRAINT companies_fk FOREIGN KEY (zip_code_id) REFERENCES public.zip_codes(id),
	CONSTRAINT companies_fk_1 FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.campaigns (
	id serial4 NOT NULL,
	company_id int4 NOT NULL,
	"name" varchar NULL,
	"type" char(1) NULL,
	active bool NULL,
	card_color varchar NULL,
	card_title varchar NULL,
	card_subtitle varchar NULL,
	card_foot_note varchar NULL,
	card_logo varchar NULL,
	card_main_image varchar NULL,
	card_points int4 NULL,
	description varchar NULL,
	conditions text NULL,
	modification_date timestamp NULL,
	modification_user_id uuid NULL,
	CONSTRAINT campaigns_pk PRIMARY KEY (id),
	CONSTRAINT campaigns_fk FOREIGN KEY (company_id) REFERENCES public.companies(id)
);

CREATE TABLE public.terminals (
  id serial4 NOT NULL,
  company_id int4 NOT NULL,
  campaign_id int4 NOT NULL,
  user_id uuid NOT NULL,
	terminal_password varchar NOT NULL,
	terminal_user varchar NOT NULL,
  "name" varchar NULL,
  description varchar NULL,
  active bool NULL,
  timeout int4 NULL,
  modification_date timestamp NULL,
	modification_user_id uuid NULL,
  CONSTRAINT terminals_pk PRIMARY KEY (id),
	CONSTRAINT terminals_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT terminals_fk_1 FOREIGN KEY (company_id) REFERENCES public.companies(id),
	CONSTRAINT terminals_fk_2 FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id)
);

CREATE TABLE public.user_cards (
  id serial4 NOT NULL,
  user_id uuid NOT NULL,
  campaign_id int4 NOT NULL,
  card_points int4 NULL,
  card_points_current int4 NULL,
  prizes int4 NULL,
  conditions_accepted bool NULL,
  conditions_accepted_date timestamp NULL,
  last_used timestamp NULL,
  active bool NULL,
  CONSTRAINT user_cards_pk PRIMARY KEY (id),
	CONSTRAINT user_cards_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT user_cards_fk_1 FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id)
);

CREATE TABLE public.transactions_user_cards_points (
  id serial4 NOT NULL,
  user_id uuid NOT NULL,
  campaign_id int4 NOT NULL,
  earned_card_points int4 NULL,
  card_points int4 NULL,
  card_points_total int4 NULL,
  prizes int4 NULL,
  date_time timestamp NULL,
  terminal_name varchar NULL,
  terminal_user int4 NULL,
  CONSTRAINT transactions_user_cards_points_pk PRIMARY KEY (id),
	CONSTRAINT transactions_user_cards_points_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT transactions_user_cards_points_fk_1 FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id)
);