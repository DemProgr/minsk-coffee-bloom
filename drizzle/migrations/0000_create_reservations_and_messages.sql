CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  party_size INT NOT NULL,
  reserved_date DATE NOT NULL,
  reserved_time TIME NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a reservation"
ON public.reservations FOR INSERT TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(phone) BETWEEN 5 AND 40
  AND party_size BETWEEN 1 AND 20
  AND (note IS NULL OR length(note) <= 500)
  AND reserved_date >= (now() AT TIME ZONE 'Europe/Minsk')::date
);

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a message"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND length(message) BETWEEN 1 AND 1000
);