--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-17 21:59:06

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

--
-- TOC entry 2 (class 3079 OID 16829)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 883 (class 1247 OID 16945)
-- Name: network_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.network_status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.network_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16996)
-- Name: blog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    content text NOT NULL,
    "featuredImage" character varying,
    "metaDescription" character varying,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "isTrending" boolean DEFAULT false NOT NULL,
    "isLatest" boolean DEFAULT true NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "categoryId" uuid,
    "authorId" uuid,
    "featuredAt" timestamp without time zone
);


ALTER TABLE public.blog OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16965)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "categoryName" character varying NOT NULL,
    "categoryTitle" character varying NOT NULL,
    "categoryDescription" character varying,
    image character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16840)
-- Name: coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupon (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    detail text NOT NULL,
    code character varying,
    "htmlCodeUrl" character varying,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL,
    category character varying NOT NULL,
    rank integer DEFAULT 0 NOT NULL,
    "isFreeShipping" boolean DEFAULT false NOT NULL,
    "isExclusive" boolean DEFAULT false NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "showOnHomePage" boolean DEFAULT false NOT NULL,
    "isTopCategory" boolean DEFAULT false NOT NULL,
    "mainImage" character varying,
    "secondaryImage" character varying,
    "codeImage" character varying,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "storeId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "categoryId" uuid
);


ALTER TABLE public.coupon OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18051)
-- Name: coupon_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupon_categories (
    "couponId" uuid NOT NULL,
    "categoryId" uuid NOT NULL
);


ALTER TABLE public.coupon_categories OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16897)
-- Name: coupon_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupon_products (
    "couponId" uuid NOT NULL,
    "productId" uuid NOT NULL
);


ALTER TABLE public.coupon_products OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17999)
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL,
    "bannerImage" character varying,
    "metaDescription" character varying,
    "seoKeywords" text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "descriptionHeading" character varying,
    "extraDescriptionHeading" character varying,
    "extraDescriptionContent" text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "isTrending" boolean DEFAULT false NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "termsAndConditions" text
);


ALTER TABLE public.event OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 18016)
-- Name: event_coupons_coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_coupons_coupon (
    "eventId" uuid NOT NULL,
    "couponId" uuid NOT NULL
);


ALTER TABLE public.event_coupons_coupon OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18009)
-- Name: event_stores_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_stores_store (
    "eventId" uuid NOT NULL,
    "storeId" uuid NOT NULL
);


ALTER TABLE public.event_stores_store OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16949)
-- Name: network; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.network (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    status public.network_status_enum DEFAULT 'active'::public.network_status_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "categoryId" uuid
);


ALTER TABLE public.network OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16857)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "storeId" uuid NOT NULL,
    name character varying NOT NULL,
    heading character varying NOT NULL,
    "oldPrice" numeric(10,2),
    "currentPrice" numeric(10,2) NOT NULL,
    detail text NOT NULL,
    "imageUrl" character varying,
    "htmlUrl" character varying,
    category character varying NOT NULL,
    sku character varying NOT NULL,
    size character varying,
    color character varying,
    material character varying,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid NOT NULL,
    "categoryId" uuid
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16869)
-- Name: store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "secondaryName" character varying,
    "headingH1" character varying,
    "headingH2" character varying,
    "storeId" character varying,
    "storeUrl" character varying,
    network character varying,
    "htmlCode" character varying,
    "impressionCode" character varying,
    "storeTitle" character varying,
    categories text,
    "isPopularStore" boolean DEFAULT false NOT NULL,
    "isFeatureStore" boolean DEFAULT false NOT NULL,
    "isCategoryFeatureStore" boolean DEFAULT false NOT NULL,
    "logoUrl" character varying,
    "thumbnailUrl" character varying,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid NOT NULL,
    "metaDescription" character varying,
    "storeDescription" character varying,
    "storeArticle" text,
    faqs json DEFAULT '[]'::json,
    "networkId" uuid,
    "categoryId" uuid
);


ALTER TABLE public.store OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16883)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    permissions text,
    "createdByAdminId" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 5006 (class 0 OID 16996)
-- Dependencies: 225
-- Data for Name: blog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog (id, title, content, "featuredImage", "metaDescription", "isFeatured", "isTrending", "isLatest", "viewCount", "createdAt", "updatedAt", "categoryId", "authorId", "featuredAt") FROM stdin;
8769d728-8f1a-4ef8-93c1-3ea3b3d9395b	Understanding Node.js Event Loop	The event loop in Node.js is a mechanism that handles asynchronous operations...	https://res.cloudinary.com/dwqmexglg/image/upload/v1742140310/imageUpload/x3a9dyetajuzq2qmno9x.jpg	Learn how the Node.js event loop works and manages asynchronous tasks efficiently.	t	f	t	0	2025-03-16 23:17:27.025505	2025-03-16 23:17:27.025505	3117b8eb-ec45-49fc-beee-2632165aa95c	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
2a2c849f-7b85-44a6-ab36-b71baa9c000d	Aliqua Eligendi dis	Sunt perspiciatis 	https://res.cloudinary.com/dwqmexglg/image/upload/v1742222441/imageUpload/okmghlxqofovjrj5lbom.jpg	Minim voluptas libero rerum dolor numquam sed a eu	f	t	t	0	2025-03-17 19:40:52.124479	2025-03-17 19:40:52.124479	3117b8eb-ec45-49fc-beee-2632165aa95c	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
\.


--
-- TOC entry 5005 (class 0 OID 16965)
-- Dependencies: 224
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, "categoryName", "categoryTitle", "categoryDescription", image, "createdAt", "updatedAt") FROM stdin;
d0bdd703-2cfd-45cb-bc80-dfa5e72b2fa6	beauty_personal_care	Beauty and Personal Care	Explore a wide range of beauty and personal care products, from skincare to cosmetics.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741632702/imageUpload/k5rxwxynvhifl8mfk0sb.png	2025-03-10 23:52:17.683635	2025-03-10 23:52:17.683635
3117b8eb-ec45-49fc-beee-2632165aa95c	clothing_accessories	Clothing Accessories	Browse stylish clothing accessories including bags, hats, and jewelry.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741632818/imageUpload/efoypixzbcngelgnylfe.png	2025-03-10 23:54:32.542371	2025-03-10 23:54:32.542371
62bf97c3-55cc-4a23-9325-1b2574bc7e62	home_and_garden	Home and Garden	Transform your home and garden with our selection of decor and outdoor essentials.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633165/imageUpload/l0po4fseavhx2d2blqzb.png	2025-03-10 23:59:54.992584	2025-03-10 23:59:54.992584
4a98c440-1547-460c-a401-856ba12e1d5e	travels_and_tours	Travels and Tours	Plan your next vacation with exciting travel packages and tours.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633165/imageUpload/l0po4fseavhx2d2blqzb.png	2025-03-11 00:00:11.394372	2025-03-11 00:00:11.394372
4a8852a2-98bb-4971-9dc4-c157767a523a	fashion	Fashion	Stay trendy with our latest fashion collections for men and women.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633270/imageUpload/fiefyypxkzgcxcwqfc6w.png	2025-03-11 00:04:00.520361	2025-03-11 00:04:00.520361
64a68abd-347e-458b-821f-0e64023881b4	sports_outdoor	Sports & Outdoor	Gear up for your favorite sports and outdoor activities with premium products.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633165/imageUpload/l0po4fseavhx2d2blqzb.png	2025-03-11 00:04:15.715424	2025-03-11 00:04:15.715424
a7562ca4-368f-40d6-b00a-51a08d624829	automotive	Automotive	Find essential automotive accessories and parts for your car or motorcycle.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633507/imageUpload/b4sbbd1upd4uokmg70f0.png	2025-03-11 00:05:51.092473	2025-03-11 00:05:51.092473
c33b96fc-4adc-4b26-9bd9-bfdfabe90052	health_and_wellness	Health and Wellness	Discover wellness products and services to improve your mental and physical health.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633507/imageUpload/b4sbbd1upd4uokmg70f0.png	2025-03-11 00:06:40.857833	2025-03-11 00:06:40.857833
c01e12ba-9493-4c8b-a4b3-1c75aabee655	baby_and_kids	Baby and Kids	Find everything you need for your baby and kids, from clothing to toys and care items.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633507/imageUpload/b4sbbd1upd4uokmg70f0.png	2025-03-11 00:06:55.32174	2025-03-11 00:06:55.32174
540a45b4-f6b3-4331-8818-b4210fbd04e8	food_and_beverages	Food and Beverages	Explore a wide variety of delicious food and beverages for every taste and occasion.	https://res.cloudinary.com/dwqmexglg/image/upload/v1741633507/imageUpload/b4sbbd1upd4uokmg70f0.png	2025-03-11 00:07:15.776701	2025-03-11 00:07:15.776701
a45d220a-d948-46cf-9053-40edfe3b1170	Atificial intelligence	AI	AI is game changer	https://res.cloudinary.com/dj7pldynz/image/upload/v1741344479/FreeImageUploader/pozf8qlsllkhi2zfok2q.png	2025-03-07 15:58:10.541696	2025-03-16 15:40:43.856408
\.


--
-- TOC entry 4999 (class 0 OID 16840)
-- Dependencies: 218
-- Data for Name: coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupon (id, name, detail, code, "htmlCodeUrl", "startDate", "endDate", category, rank, "isFreeShipping", "isExclusive", "isVerified", "showOnHomePage", "isTopCategory", "mainImage", "secondaryImage", "codeImage", "isActive", "createdAt", "updatedAt", "storeId", "userId", "categoryId") FROM stdin;
e72ae1b3-d43f-4166-ae41-8af6688047a5	€350 De Reduction Promo	Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.	SAVE350	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-12-01 05:00:00	2024-01-01 04:59:59	Electronics	2	f	f	t	f	f	€350	De Reduction	Code	t	2025-03-05 18:45:53.009663	2025-03-05 18:45:53.009663	ae972de5-97a7-4b34-90ae-00bac1b34bb1	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
097765e8-2f37-408b-b61e-4dbbc02a7b32	Maggie Schultz	Maiores omnis dolore	Pariatur Adipisci d	Voluptas eos nisi in	2025-03-28 00:00:00	2025-03-29 00:00:00	Numquam cumque sit 	14	f	t	f	f	f	\N	\N	\N	t	2025-03-06 01:29:16.620107	2025-03-06 01:29:16.620107	ae972de5-97a7-4b34-90ae-00bac1b34bb1	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
d778e450-d4a8-479a-bda9-900458c5aae0	Amethyst Gonzalez	Temporibus consectet	Odit quam non nisi e	Do voluptatem volup	2025-03-04 00:00:00	2025-03-18 00:00:00	4a8852a2-98bb-4971-9dc4-c157767a523a	2	t	t	f	f	f	Velit incididunt sun	Est odio praesentiu	\N	f	2025-03-16 16:06:22.624002	2025-03-16 16:06:22.624002	084b9905-0b74-4493-8f30-125801b0e006	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
843d8e4d-cd2b-41cf-a1a9-8222a1663191	Rafael Wagner	Culpa deserunt dolor	Voluptatibus vitae m	Minus asperiores adi	2025-03-05 00:00:00	2025-03-20 00:00:00	d0bdd703-2cfd-45cb-bc80-dfa5e72b2fa6	45	t	t	f	f	f	Distinctio Cillum d	Error qui voluptas a	\N	f	2025-03-16 16:29:26.7446	2025-03-16 16:29:26.7446	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
310efd41-1a4a-4a6b-8287-ace01391a2b0	€350 De Reduction Promo	Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.	SAVE350	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-12-01 05:00:00	2024-01-01 04:59:59	Electronics	2	f	f	t	f	f	€350	De Reduction	Code	t	2025-03-06 11:26:25.135839	2025-03-06 11:26:25.135839	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
da914018-49fc-4a7c-9f49-9cd1e09ff801	€350 De Reduction Promo	Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.	SAVE350	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-12-01 05:00:00	2024-01-01 04:59:59	Electronics	2	f	f	t	f	f	€350	De Reduction	Code	t	2025-03-06 11:26:56.893086	2025-03-06 11:26:56.893086	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
394afc0b-627e-4074-b798-78ccdcc80688	€350 Holiday Discount - Limited Time Deal!	Get into the festive spirit with Donner Music's Christmas Sale! Enjoy a massive €350 discount on select purchases when you shop through our exclusive landing page.	SAVE350	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-12-01 05:00:00	2024-01-01 04:59:59	Electronics & Music Gear	2	f	f	t	t	t	€350 OFF	Holiday Deal	SAVE350	t	2025-03-06 12:23:37.446898	2025-03-06 12:23:37.446898	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
cb8ff273-55d5-4774-91aa-2c3e4841a0bb	€350 Holiday Discount - Limited Time Deal!	Get into the festive spirit with Donner Music's Christmas Sale! Enjoy a massive €350 discount on select purchases when you shop through our exclusive landing page.	SAVE350	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-12-01 05:00:00	2024-01-01 04:59:59	Electronics & Music Gear	2	f	f	t	t	t	€350 OFF	Holiday Deal	SAVE350	t	2025-03-06 12:24:46.206889	2025-03-06 12:24:46.206889	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
556547e8-18e4-48a8-98a0-a8e3eedec7f5	Spring Sale - €150 Off Instruments & Gear	Celebrate spring with Donner Music! Enjoy €150 off select instruments and gear when you shop through our special spring sale page.	SPRING150	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2024-03-15 05:00:00	2024-04-16 04:59:59	Instruments & Accessories	3	t	t	t	t	f	€150 OFF	Spring Sale	SPRING150	t	2025-03-06 12:25:48.093908	2025-03-06 12:25:48.093908	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
60610078-8629-4298-8ba0-9f63425fd97d	Halloween Spooky Savings - €100 Off	Trick or Treat! Enjoy €100 off your music gear purchase during our Halloween Special Sale.	BOO100	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-10-15 05:00:00	2023-11-01 04:59:59	Music Equipment	5	t	f	t	f	f	€100 OFF	Halloween Special	BOO100	f	2025-03-06 12:26:40.763288	2025-03-06 12:26:40.763288	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
f38dc1bc-124f-42d9-85f5-6b7ca573b457	Valentine’s Day Deal - €50 Off Gifts for Musicians	Show your love with music! Get €50 off perfect musical gifts this Valentine’s Day at Donner Music.	LOVE50	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2024-02-01 05:00:00	2024-02-15 04:59:59	Gift Ideas & Accessories	6	f	t	t	t	f	€50 OFF	Valentine’s Day Special	LOVE50	f	2025-03-06 12:27:12.77857	2025-03-06 12:27:12.77857	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
e25559e4-d09c-417d-bf77-9bb853b0ff98	Back to School - €75 Off Music Essentials	Kick off the school year with savings! Get €75 off on essential music gear for students and teachers.	SCHOOL75	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-08-15 05:00:00	2023-09-11 04:59:59	Education & Music Supplies	4	t	f	t	f	f	€75 OFF	Back to School	SCHOOL75	f	2025-03-06 12:27:38.585014	2025-03-06 12:27:38.585014	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
caea5081-f704-4cf7-953b-ce1af0e416c2	Back to School - €75 Off Music Essentials	Kick off the school year with savings! Get €75 off on essential music gear for students and teachers.	SCHOOL75	https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2023-08-15 05:00:00	2026-09-11 04:59:59	Education & Music Supplies	4	t	f	t	f	f	€75 OFF	Back to School	SCHOOL75	f	2025-03-06 12:39:37.28147	2025-03-06 12:39:37.28147	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
d92d9e58-077d-414e-8949-9a84d673a569	Davis Reed edited	Esse quia iste iste 	Aliquid neque non in	Autem voluptates cum	2025-03-06 05:00:00	2025-03-07 05:00:00	Quam et explicabo L	64	t	f	t	f	f	\N	\N	\N	t	2025-03-06 00:01:15.962562	2025-03-06 14:12:21.585574	ae972de5-97a7-4b34-90ae-00bac1b34bb1	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
88acbcd9-5233-406c-9817-50f7371a88c7	Valentine’s Day Deal - €50 Off Gifts for Musicians	Show your love with music! Get €50 off perfect musical gifts this Valentine’s Day at Donner Music.		https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com	2024-02-01 05:00:00	2025-03-07 05:00:00	Gift Ideas & Accessories	6	f	t	f	f	f	€50 OFF	Valentine’s Day Special	LOVE50	f	2025-03-06 12:44:49.07444	2025-03-06 14:26:18.267352	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
613f03fb-8bef-4ac2-8ffd-c76b79944d69	Shana Wade	Iste amet exercitat	Iure reprehenderit 	Quis ut voluptatem 	2025-03-05 00:00:00	2025-03-22 00:00:00	test	32	f	t	f	f	f	Consequatur itaque v	Aute eos elit corr	\N	f	2025-03-07 11:35:23.505836	2025-03-07 11:35:23.505836	ae972de5-97a7-4b34-90ae-00bac1b34bb1	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
645c054e-ac6b-49aa-bd0d-d14330185848	Gavin Hahn	Tempore iste assume	Omnis blanditiis in 	Quae maiores quibusd	2025-03-07 05:00:00	2025-03-29 05:00:00	d0bdd703-2cfd-45cb-bc80-dfa5e72b2fa6	69	t	t	t	f	f	20%	OFF	\N	f	2025-03-07 11:38:55.047206	2025-03-16 16:36:36.143844	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
\.


--
-- TOC entry 5010 (class 0 OID 18051)
-- Dependencies: 229
-- Data for Name: coupon_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupon_categories ("couponId", "categoryId") FROM stdin;
\.


--
-- TOC entry 5003 (class 0 OID 16897)
-- Dependencies: 222
-- Data for Name: coupon_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupon_products ("couponId", "productId") FROM stdin;
e72ae1b3-d43f-4166-ae41-8af6688047a5	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
d92d9e58-077d-414e-8949-9a84d673a569	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
097765e8-2f37-408b-b61e-4dbbc02a7b32	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
310efd41-1a4a-4a6b-8287-ace01391a2b0	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
da914018-49fc-4a7c-9f49-9cd1e09ff801	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
394afc0b-627e-4074-b798-78ccdcc80688	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
394afc0b-627e-4074-b798-78ccdcc80688	28579c4c-6783-42c7-a5c6-a03a53126a9f
cb8ff273-55d5-4774-91aa-2c3e4841a0bb	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
cb8ff273-55d5-4774-91aa-2c3e4841a0bb	28579c4c-6783-42c7-a5c6-a03a53126a9f
556547e8-18e4-48a8-98a0-a8e3eedec7f5	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
556547e8-18e4-48a8-98a0-a8e3eedec7f5	28579c4c-6783-42c7-a5c6-a03a53126a9f
60610078-8629-4298-8ba0-9f63425fd97d	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
60610078-8629-4298-8ba0-9f63425fd97d	28579c4c-6783-42c7-a5c6-a03a53126a9f
f38dc1bc-124f-42d9-85f5-6b7ca573b457	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
f38dc1bc-124f-42d9-85f5-6b7ca573b457	28579c4c-6783-42c7-a5c6-a03a53126a9f
e25559e4-d09c-417d-bf77-9bb853b0ff98	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
e25559e4-d09c-417d-bf77-9bb853b0ff98	28579c4c-6783-42c7-a5c6-a03a53126a9f
caea5081-f704-4cf7-953b-ce1af0e416c2	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
caea5081-f704-4cf7-953b-ce1af0e416c2	28579c4c-6783-42c7-a5c6-a03a53126a9f
88acbcd9-5233-406c-9817-50f7371a88c7	f34a1b8d-4a29-4bb6-b535-e5e9d627c47c
88acbcd9-5233-406c-9817-50f7371a88c7	28579c4c-6783-42c7-a5c6-a03a53126a9f
613f03fb-8bef-4ac2-8ffd-c76b79944d69	28579c4c-6783-42c7-a5c6-a03a53126a9f
645c054e-ac6b-49aa-bd0d-d14330185848	28579c4c-6783-42c7-a5c6-a03a53126a9f
d778e450-d4a8-479a-bda9-900458c5aae0	5d80910c-db17-4d5f-a2d8-7ee5e4c9573e
843d8e4d-cd2b-41cf-a1a9-8222a1663191	5d80910c-db17-4d5f-a2d8-7ee5e4c9573e
\.


--
-- TOC entry 5007 (class 0 OID 17999)
-- Dependencies: 226
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event (id, title, description, "startDate", "endDate", "bannerImage", "metaDescription", "seoKeywords", "createdAt", "updatedAt", "descriptionHeading", "extraDescriptionHeading", "extraDescriptionContent", "isFeatured", "isTrending", "viewCount", "termsAndConditions") FROM stdin;
feb0d110-7fd3-41cd-bd01-01e9f38e7637	Christmas Deals 2025	Undoubtedly the biggest shopping holiday for every season, the Black Friday stirs up expectations among consumers to save on their luxury purchases. If you are little furious about the crowds in stores, we understand you. Accept our open invitation to shop what you love from the most comfortable Black Friday sale ever, that we are glad to have for you.	2025-12-01 05:00:00	2026-01-01 04:59:59	https://example.com/banner.jpg	Get the best Christmas deals of 2025	Christmas Deals,Best Offers,Holiday Discounts	2025-03-14 20:36:53.513097	2025-03-14 20:36:53.513097	Christmas Deals 2025	What Does Size-Inclusive Mean?	What is in your list of New Year’s resolutions? If savings are in, we predict that you will succeed. Since you are already here and we have been committed to coupons and fashion, it will be perfect if we get together. Christmas is time for you to prepare for endless party, sweet gifts and now savings too. Because we are arranging plenty of them! Sign up with us, take our discount deals and shopping advice that will feel like perfect Christmas treat. Retailers may have set records of earning millions every holiday season, you can set new ones. By saving your money with up to 90% off coupons that stores offer at special occasions like Christmas, you can essentially control your budgets for months. Looking for special gifts for your loved ones? Bebe’s accessories, Daniel Wellington watches and The Tie Bar deals may make you pretty happy, as soon as you click them.	t	t	5000	Limited to the first 500 customers
3cbdac5b-96e7-4783-9fa2-de6a2e5d81d9	Anim elit aliquip q	Pariatur Aspernatur	2025-03-16 00:00:00	2025-03-19 00:00:00	Ea molestiae consequ	Rem esse voluptates ut eum dolore id velit sunt	0	2025-03-16 19:55:28.156282	2025-03-16 19:55:28.156282	In velit cupiditate 	Sequi in et ipsam ut	Sed sint nulla tempo	t	f	20	Eum pariatur Quia r
faa298f5-8318-4d4a-baad-77d3813f47dd	Dignissimos est dolo	Perferendis aut sint	2025-03-17 00:00:00	2025-03-19 00:00:00	Facilis et qui quis 	Aut voluptatem Neque pariatur In	jhjdhsjhd	2025-03-17 19:36:59.446669	2025-03-17 19:36:59.446669	Ut anim est aspernat	Voluptate eos error	Aut consequatur dol	t	t	30	Voluptatem quia cons
\.


--
-- TOC entry 5009 (class 0 OID 18016)
-- Dependencies: 228
-- Data for Name: event_coupons_coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_coupons_coupon ("eventId", "couponId") FROM stdin;
feb0d110-7fd3-41cd-bd01-01e9f38e7637	645c054e-ac6b-49aa-bd0d-d14330185848
feb0d110-7fd3-41cd-bd01-01e9f38e7637	310efd41-1a4a-4a6b-8287-ace01391a2b0
feb0d110-7fd3-41cd-bd01-01e9f38e7637	da914018-49fc-4a7c-9f49-9cd1e09ff801
feb0d110-7fd3-41cd-bd01-01e9f38e7637	394afc0b-627e-4074-b798-78ccdcc80688
feb0d110-7fd3-41cd-bd01-01e9f38e7637	cb8ff273-55d5-4774-91aa-2c3e4841a0bb
3cbdac5b-96e7-4783-9fa2-de6a2e5d81d9	88acbcd9-5233-406c-9817-50f7371a88c7
faa298f5-8318-4d4a-baad-77d3813f47dd	613f03fb-8bef-4ac2-8ffd-c76b79944d69
\.


--
-- TOC entry 5008 (class 0 OID 18009)
-- Dependencies: 227
-- Data for Name: event_stores_store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_stores_store ("eventId", "storeId") FROM stdin;
feb0d110-7fd3-41cd-bd01-01e9f38e7637	1dae4388-14ab-40bb-b1a7-9dc4c7a15662
3cbdac5b-96e7-4783-9fa2-de6a2e5d81d9	c8ccfb27-db0e-40c5-9a3b-7e9992a8f8c0
faa298f5-8318-4d4a-baad-77d3813f47dd	c8ccfb27-db0e-40c5-9a3b-7e9992a8f8c0
faa298f5-8318-4d4a-baad-77d3813f47dd	eff2b556-7cee-4689-9304-cb9bb86f05ca
\.


--
-- TOC entry 5004 (class 0 OID 16949)
-- Dependencies: 223
-- Data for Name: network; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.network (id, name, status, "createdAt", "updatedAt", "categoryId") FROM stdin;
2966bac6-ff0f-447c-83b3-9aff77186a10	Retail Network	active	2025-03-07 15:10:12.926758	2025-03-07 15:10:12.926758	\N
e8d9e765-69ff-4941-bb11-72af83c97304	Electronics	active	2025-03-07 15:26:17.767831	2025-03-07 15:26:17.767831	\N
85d03633-e281-4a15-b473-899117bc3cd3	Randall Huffman	active	2025-03-07 15:27:40.824566	2025-03-07 15:27:40.824566	\N
\.


--
-- TOC entry 5000 (class 0 OID 16857)
-- Dependencies: 219
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, "storeId", name, heading, "oldPrice", "currentPrice", detail, "imageUrl", "htmlUrl", category, sku, size, color, material, "isFeatured", "isActive", "createdAt", "updatedAt", "userId", "categoryId") FROM stdin;
f34a1b8d-4a29-4bb6-b535-e5e9d627c47c	ae972de5-97a7-4b34-90ae-00bac1b34bb1	LP electric guitar	Donner DLP-124S LP Electric Guitar Kit	149.99	129.99	This DLP-124S LP electric guitar kit features a sunburst yellow body with bag, strap, cable, and more accessories.	https://example.com/product-image.jpg	https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u=	Electronics	EC1276	39 inch	Sunburst Yellow	AAA Solid Poplar	t	t	2025-03-05 18:44:36.011075	2025-03-05 18:44:36.011075	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
28579c4c-6783-42c7-a5c6-a03a53126a9f	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	LP electric guitar	Donner DLP-124S LP Electric Guitar Kit	149.99	129.99	This DLP-124S LP electric guitar kit features a sunburst yellow body with bag, strap, cable, and more accessories.	https://example.com/product-image.jpg	https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u=	Electronics	EC1276	39 inch	Sunburst Yellow	AAA Solid Poplar	t	t	2025-03-06 11:36:52.976694	2025-03-06 11:36:52.976694	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
309b9186-c16a-4f4b-8a80-1cdd67bbdd5c	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	Wireless Bluetooth Headphones	Active Noise Cancelling Over-Ear Wireless Headphones with Mic	129.99	89.99	Experience immersive sound with these wireless Bluetooth headphones. Featuring active noise cancellation, crystal-clear microphone, and up to 40 hours of battery life. Perfect for travel, work, and music lovers. Soft memory foam ear cushions ensure all-day comfort.	https://res.cloudinary.com/dj7pldynz/image/upload/v1741621932/FreeImageUploader/dhna5u9sqhrysybkdgfp.png	https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u=wireless-headphones	Electronics	WH-ANC-BT	Adjustable	Matte Black	Plastic, Memory Foam, Metal	t	t	2025-03-10 20:53:47.691693	2025-03-10 20:53:47.691693	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
5d80910c-db17-4d5f-a2d8-7ee5e4c9573e	1dae4388-14ab-40bb-b1a7-9dc4c7a15662	Men's Running Shoes	Lightweight Breathable Running Shoes for Men - Non-Slip Sports Sneakers	89.99	59.99	These men's running shoes offer ultimate comfort with breathable mesh fabric, cushioned insoles, and a durable non-slip rubber sole. Ideal for jogging, workouts, and everyday casual wear. Lightweight design ensures all-day comfort.	https://res.cloudinary.com/dj7pldynz/image/upload/v1741622120/FreeImageUploader/nhzpdfg4akynfmeojvx7.png	https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u=mens-running-shoes	Footwear	RUN-M-001	7-12 (US)	Black/White/Grey	Mesh, Rubber, EVA Foam	t	t	2025-03-10 20:56:11.702726	2025-03-10 20:56:11.702726	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N
\.


--
-- TOC entry 5001 (class 0 OID 16869)
-- Dependencies: 220
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store (id, name, "secondaryName", "headingH1", "headingH2", "storeId", "storeUrl", network, "htmlCode", "impressionCode", "storeTitle", categories, "isPopularStore", "isFeatureStore", "isCategoryFeatureStore", "logoUrl", "thumbnailUrl", "isActive", "createdAt", "updatedAt", "userId", "metaDescription", "storeDescription", "storeArticle", faqs, "networkId", "categoryId") FROM stdin;
ae972de5-97a7-4b34-90ae-00bac1b34bb1	My Awesome Store	Best Deals Online	Welcome to Our Store	Find the Best Deals	store-123	https://www.mystore.com	Retail Network	<div class="store-embed">Store content</div>	<script>trackImpression("store-123")</script>	My Store - Best Deals Online	Electronics,Home Appliances,Gadgets	t	f	t	https://example.com/store-logo.png	https://example.com/store-thumbnail.png	t	2025-03-05 16:12:04.921503	2025-03-05 16:12:04.921503	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N	\N	\N	[]	\N	\N
c8ccfb27-db0e-40c5-9a3b-7e9992a8f8c0	Leo Mcguire	Heidi Rodriquez	Aut nostrud vero duc	Totam sint aliquid 	Obcaecati eligendi a	Possimus do anim ut	Neque quidem quo tem	Laboris alias nobis 	Ut amet a alias sit	Anim voluptas nulla 	Electronics	f	t	t	Eos do ducimus cul	Eos et pariatur Eiu	f	2025-03-06 15:49:51.358594	2025-03-06 15:49:51.358594	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N	\N	\N	[]	\N	\N
eff2b556-7cee-4689-9304-cb9bb86f05ca	Dakota Downs	Meghan Carrillo	Et est ut ea vero al	Quia sunt cupidatat 	Ut est adipisci mini	Maiores voluptas vol	Itaque magni volupta	Adipisci sequi non e	Ea est autem non err	Facilis est similiq	Eius	t	t	t	Amet elit repudian	Perspiciatis ut vel	f	2025-03-06 15:53:00.749262	2025-03-06 15:53:00.749262	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	\N	\N	\N	[]	\N	\N
d4c18814-b248-4a8f-b77d-1b5d5df346c8	Dakota Hewitt	Yardley Lane	Dolore eos dicta id 	Sint cumque vel volu	Consequuntur dolorem	https://example.com	A cupidatat laborum	Asperiores rerum adi	Tempore et consequa	Saepe nulla fugiat 	\N	f	t	t	Quaerat ullamco aliq	Rerum reiciendis con	f	2025-03-07 02:44:47.827942	2025-03-07 03:15:53.074794	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	Sit molestias et non doloremque deserunt rem dolore	Laboris non architec	<h3><strong>Understanding JavaScript Closures</strong></h3><p><i>A closure is the combination of a function and the lexical environment within which that function was declared.</i></p><p><i>In JavaScript, closures are created every time a function is created. Closures are powerful because they allow a function to remember the scope in which it was created, even after that scope has finished execution.</i></p><p><i>Closures are useful for many programming scenarios, such as data encapsulation and partial function</i> application.</p><p>In this article, we'll walk through examples of closures in action:<br>1. Example 1: Simple Closure<br>2. Example 2: Closure with private variables</p><p>Understanding closures is crucial to mastering JavaScript and functional programming.</p><p>Tags: JavaScript, Programming, Closures<br>Category: Tech<br>Author: John Doe<br>Publish Date: March 7, 2025<br>Summary: A deep dive into closures in JavaScript and how they work.<br>&nbsp;</p>	[]	\N	\N
1dae4388-14ab-40bb-b1a7-9dc4c7a15662	Sylvester Barrera Electronics	Top Quality Electronics & Gadgets	Welcome to Sylvester Barrera Electronics	Discover the Latest Deals and Offers	sylvester-barrera-electronics	https://www.sylvesterbarreraelectronics.com	Global Retail Network	https://clk.tradedoubler.com/click?p=331962&a=3227122&url=https%3A%2F%2Ffr.donnermusic.com%2Fproducts%2Fkit-de-guitare-electrique-donner-dst-80-39-pouces-mat-givre-st-avec-amplificateur	<script>trackImpression('sylvester-barrera-electronics')</script>	Sylvester Barrera Electronics - Best Gadgets & Appliances	Electronics,Gadgets,Home Appliances	t	f	t	https://i.ibb.co/wFRhBT7r/33399663-8011901.jpg	https://example.com/images/sylvester-thumbnail.png	t	2025-03-05 21:00:39.595848	2025-03-07 16:09:40.364457	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	Edited	Sylvester Barrera Electronics is your one-stop shop for high-quality, cutting-edge electronic products. From home entertainment systems to the latest gadgets, we provide top-tier electronics that cater to every need. Whether you're a tech enthusiast or someone looking for practical, everyday devices, our store offers reliable products from trusted brands. With a commitment to quality and customer satisfaction,	<h3><strong>Welcome to Sylvester Barrera Electronics</strong></h3><p><i>At <strong>Sylvester Barrera Electronics</strong>, we are passionate about providing top-of-the-line electronics to our customers. Whether you're a tech enthusiast or looking for practical solutions to elevate your home or business, we have a wide range of products to meet your needs.</i></p><h3>Our Products</h3><ul><li>We offer an extensive selection of products, from the latest <strong>smartphones</strong> to high-performance <strong>computers</strong>, <strong>audio systems</strong>, <strong>home entertainment equipment</strong>, and more. Each product in our catalog is carefully chosen for its quality, functionality, and value, ensuring that our customers get the best deals available.</li><li>Whether you're looking for <strong>4K TVs</strong>, <strong>smart home gadgets</strong>, <strong>gaming consoles</strong>, or <strong>kitchen appliances</strong>, we have it all. Our team of experts keeps an eye on the latest trends in the electronics industry, so you can trust that you're getting cutting-edge technology.</li></ul><h3>Why Choose Sylvester Barrera Electronics?</h3><p><strong>Top Brands</strong><br>We pride ourselves on offering products from leading brands in the electronics industry. From <strong>Apple</strong> to <strong>Sony</strong>, <strong>Samsung</strong>, <strong>LG</strong>, and more, we work with only the most trusted names, ensuring that our customers get the best possible products.</p><p><strong>Affordable Pricing</strong><br>We believe that everyone should have access to the best technology without breaking the bank. That's why we offer competitive pricing on all our products, along with frequent sales and promotions to help you save even more.</p><p><strong>Expert Customer Service</strong><br>At Sylvester Barrera Electronics, customer satisfaction is our top priority. Our knowledgeable staff is always ready to assist with any questions or concerns, whether you're looking for product recommendations or need help with after-sales support.</p><h3>Our Store Locations</h3><p>We are proud to serve customers both locally and online. Our physical stores are conveniently located in major cities, with each store offering a wide range of products on display. For those who prefer shopping online, our website offers easy navigation and fast shipping, allowing you to shop from the comfort of your home.</p><h3>&nbsp;</h3>	[{"question":"what is Our Store Locations","answer":"We are proud to serve customers both locally and online. Our physical stores are conveniently located in major cities, with each store offering a wide range of products on display. For those who prefer shopping online, our website offers easy navigation and fast shipping, allowing you to shop from the comfort of your home"}]	\N	\N
084b9905-0b74-4493-8f30-125801b0e006	Timothy Lowery	Zachary Walton	Cillum sequi sunt is	Omnis totam dolores 	Facere porro ex illu	https://servis.pk/	Aut deserunt ipsum 	Est quia voluptas es	Consequatur Reprehe	Similique sint velit	\N	t	f	f	Voluptatem reprehen	Et ut ab reiciendis 	f	2025-03-07 10:46:55.451117	2025-03-07 10:46:55.451117	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	Nostrum qui eveniet vel eu ut hic ea iure cillum nihil enim nisi sint	Dignissimos debitis 	<h2>testing contest</h2>	[{"question":" Is this service free to use?","answer":"Absolutely! Since it doesn’t do anything real, it’s 100% free. No hidden fees, no fine print—just pure dummy data."},{"question":"How can I contact support?","answer":"You can contact our imaginary support team by sending a message to support@dummyservice.com. Please note, no one will actually respond since this is a test FAQ."}]	\N	\N
5102db38-b19f-4ada-86dc-e589d261c7ff	Lee Duffy	Mariam Vasquez	Commodo laboris quo 	Et quo sit asperior	Minus dolor est dele	https://servis.pk/	Aperiam non eos dol	Iste et eiusmod prov	Cupiditate qui dolor	Aperiam quasi aliqua	\N	t	t	f	Molestias enim conse	Culpa ipsum quibus	t	2025-03-07 11:03:02.003257	2025-03-07 11:19:51.152204	185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	Natus illum voluptas aut sed fugit nulla facere fugiat reiciendis anim iste qui maiores ipsum voluptatem eu nesciunt et rerum	Non minima aliquid o	<p>https://servis.pk/</p>	[{"question":"testing","answer":"helo"}]	\N	\N
\.


--
-- TOC entry 5002 (class 0 OID 16883)
-- Dependencies: 221
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, password, role, permissions, "createdByAdminId", "isActive", "createdAt", "updatedAt") FROM stdin;
185a0c6f-9b5b-4b35-8ee4-ee8e23dbaa4b	admin	admin@gmail.com	$2b$10$lX5ikghCOPG86fZGwK.JYugPr2SucMeGwXFCmP2..TGTf/hEly4yK	admin	all	\N	t	2025-03-05 16:11:26.219386	2025-03-05 16:11:26.219386
45367ef7-24a2-4bb2-85c8-edcad8f0d8a0	Sonya Phelps	gicur@mailinator.com	$2b$10$PAqndKKLyIGIGmlNJ3XhA.xcqAUrs/li03zsbc47IS3mHNX1LlAkS	user	visit_store_page,visit_product_page,visit_coupon_page	\N	t	2025-03-05 19:00:01.625209	2025-03-05 19:00:18.269934
3532119f-a1ec-4f1b-a6a2-83713b8ea694	John Doe	admin1@gmail.com	$2b$10$MtAvNyWoivb7ELt968sj5OddBQsgMMifOELEH4/4JQQ7G1uDtpENm	admin	read_dashboard,edit_profile	\N	t	2025-03-09 18:56:30.007601	2025-03-09 18:56:30.007601
\.


--
-- TOC entry 4813 (class 2606 OID 16901)
-- Name: coupon_products PK_1c0b7a62ed83ab3ffa5990e5579; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_products
    ADD CONSTRAINT "PK_1c0b7a62ed83ab3ffa5990e5579" PRIMARY KEY ("couponId", "productId");


--
-- TOC entry 4821 (class 2606 OID 18008)
-- Name: event PK_30c2f3bbaf6d34a55f8ae6e4614; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY (id);


--
-- TOC entry 4819 (class 2606 OID 17009)
-- Name: blog PK_85c6532ad065a448e9de7638571; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY (id);


--
-- TOC entry 4815 (class 2606 OID 16959)
-- Name: network PK_8f8264c2d37cbbd8282ee9a3c97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.network
    ADD CONSTRAINT "PK_8f8264c2d37cbbd8282ee9a3c97" PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 18020)
-- Name: event_coupons_coupon PK_9319a37ca60982554a5edb88ea3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_coupons_coupon
    ADD CONSTRAINT "PK_9319a37ca60982554a5edb88ea3" PRIMARY KEY ("eventId", "couponId");


--
-- TOC entry 4817 (class 2606 OID 16974)
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- TOC entry 4833 (class 2606 OID 18055)
-- Name: coupon_categories PK_bc817502e88207971e1c73361c8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_categories
    ADD CONSTRAINT "PK_bc817502e88207971e1c73361c8" PRIMARY KEY ("couponId", "categoryId");


--
-- TOC entry 4803 (class 2606 OID 16868)
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- TOC entry 4807 (class 2606 OID 16894)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4825 (class 2606 OID 18013)
-- Name: event_stores_store PK_ea57c5bc65d1cc3363fb5dbf6b4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_stores_store
    ADD CONSTRAINT "PK_ea57c5bc65d1cc3363fb5dbf6b4" PRIMARY KEY ("eventId", "storeId");


--
-- TOC entry 4805 (class 2606 OID 16882)
-- Name: store PK_f3172007d4de5ae8e7692759d79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY (id);


--
-- TOC entry 4801 (class 2606 OID 16856)
-- Name: coupon PK_fcbe9d72b60eed35f46dc35a682; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon
    ADD CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY (id);


--
-- TOC entry 4809 (class 2606 OID 16896)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4830 (class 1259 OID 18057)
-- Name: IDX_267c9c6a0fb90042f25deeb513; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_267c9c6a0fb90042f25deeb513" ON public.coupon_categories USING btree ("categoryId");


--
-- TOC entry 4826 (class 1259 OID 18021)
-- Name: IDX_2dfd1546dd70915db305454b36; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_2dfd1546dd70915db305454b36" ON public.event_coupons_coupon USING btree ("eventId");


--
-- TOC entry 4810 (class 1259 OID 16902)
-- Name: IDX_32d7f809acaa65ddcaf7eb22f3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_32d7f809acaa65ddcaf7eb22f3" ON public.coupon_products USING btree ("couponId");


--
-- TOC entry 4822 (class 1259 OID 18014)
-- Name: IDX_766f992847f59176daf7dbb973; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_766f992847f59176daf7dbb973" ON public.event_stores_store USING btree ("eventId");


--
-- TOC entry 4827 (class 1259 OID 18022)
-- Name: IDX_b200129fabf90a88ab39bd4829; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b200129fabf90a88ab39bd4829" ON public.event_coupons_coupon USING btree ("couponId");


--
-- TOC entry 4823 (class 1259 OID 18015)
-- Name: IDX_c0210e279cf7380598e6e12297; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_c0210e279cf7380598e6e12297" ON public.event_stores_store USING btree ("storeId");


--
-- TOC entry 4831 (class 1259 OID 18056)
-- Name: IDX_d0ce5110c43afb58f2805fbdd3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d0ce5110c43afb58f2805fbdd3" ON public.coupon_categories USING btree ("couponId");


--
-- TOC entry 4811 (class 1259 OID 16903)
-- Name: IDX_d37ece730758316fcc06d20ca3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d37ece730758316fcc06d20ca3" ON public.coupon_products USING btree ("productId");


--
-- TOC entry 4834 (class 2606 OID 16909)
-- Name: coupon FK_03de14bf5e5b4410fced2ca9935; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon
    ADD CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 4846 (class 2606 OID 17010)
-- Name: blog FK_2585c11fedee21900a332b554a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT "FK_2585c11fedee21900a332b554a6" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- TOC entry 4852 (class 2606 OID 18063)
-- Name: coupon_categories FK_267c9c6a0fb90042f25deeb5137; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_categories
    ADD CONSTRAINT "FK_267c9c6a0fb90042f25deeb5137" FOREIGN KEY ("categoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4850 (class 2606 OID 18038)
-- Name: event_coupons_coupon FK_2dfd1546dd70915db305454b36f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_coupons_coupon
    ADD CONSTRAINT "FK_2dfd1546dd70915db305454b36f" FOREIGN KEY ("eventId") REFERENCES public.event(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4837 (class 2606 OID 16919)
-- Name: product FK_329b8ae12068b23da547d3b4798; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 4843 (class 2606 OID 16929)
-- Name: coupon_products FK_32d7f809acaa65ddcaf7eb22f37; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_products
    ADD CONSTRAINT "FK_32d7f809acaa65ddcaf7eb22f37" FOREIGN KEY ("couponId") REFERENCES public.coupon(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4838 (class 2606 OID 16914)
-- Name: product FK_32eaa54ad96b26459158464379a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES public.store(id);


--
-- TOC entry 4840 (class 2606 OID 16924)
-- Name: store FK_3f82dbf41ae837b8aa0a27d29c3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT "FK_3f82dbf41ae837b8aa0a27d29c3" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 4841 (class 2606 OID 16990)
-- Name: store FK_403171c8a649b0b9d55d8ccb77c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT "FK_403171c8a649b0b9d55d8ccb77c" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- TOC entry 4835 (class 2606 OID 16904)
-- Name: coupon FK_5c844474407f18320b2d16f415b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon
    ADD CONSTRAINT "FK_5c844474407f18320b2d16f415b" FOREIGN KEY ("storeId") REFERENCES public.store(id);


--
-- TOC entry 4848 (class 2606 OID 18028)
-- Name: event_stores_store FK_766f992847f59176daf7dbb9731; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_stores_store
    ADD CONSTRAINT "FK_766f992847f59176daf7dbb9731" FOREIGN KEY ("eventId") REFERENCES public.event(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4836 (class 2606 OID 18068)
-- Name: coupon FK_7ac2227010228ec0f7d5280ca66; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon
    ADD CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- TOC entry 4847 (class 2606 OID 18083)
-- Name: blog FK_a001483d5ba65dad16557cd6ddb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


--
-- TOC entry 4845 (class 2606 OID 16975)
-- Name: network FK_addb53b6ad9312c796359174c48; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.network
    ADD CONSTRAINT "FK_addb53b6ad9312c796359174c48" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- TOC entry 4851 (class 2606 OID 18043)
-- Name: event_coupons_coupon FK_b200129fabf90a88ab39bd48295; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_coupons_coupon
    ADD CONSTRAINT "FK_b200129fabf90a88ab39bd48295" FOREIGN KEY ("couponId") REFERENCES public.coupon(id);


--
-- TOC entry 4849 (class 2606 OID 18033)
-- Name: event_stores_store FK_c0210e279cf7380598e6e12297e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_stores_store
    ADD CONSTRAINT "FK_c0210e279cf7380598e6e12297e" FOREIGN KEY ("storeId") REFERENCES public.store(id);


--
-- TOC entry 4853 (class 2606 OID 18058)
-- Name: coupon_categories FK_d0ce5110c43afb58f2805fbdd3a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_categories
    ADD CONSTRAINT "FK_d0ce5110c43afb58f2805fbdd3a" FOREIGN KEY ("couponId") REFERENCES public.coupon(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4844 (class 2606 OID 16934)
-- Name: coupon_products FK_d37ece730758316fcc06d20ca3d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_products
    ADD CONSTRAINT "FK_d37ece730758316fcc06d20ca3d" FOREIGN KEY ("productId") REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4842 (class 2606 OID 16960)
-- Name: store FK_d7170ba7d7207ed0b10c30be189; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT "FK_d7170ba7d7207ed0b10c30be189" FOREIGN KEY ("networkId") REFERENCES public.network(id);


--
-- TOC entry 4839 (class 2606 OID 16985)
-- Name: product FK_ff0c0301a95e517153df97f6812; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


-- Completed on 2025-03-17 21:59:06

--
-- PostgreSQL database dump complete
--

