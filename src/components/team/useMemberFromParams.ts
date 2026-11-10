import { useParams } from "react-router-dom";
import type { TeamMember } from "../../types";
import { getMemberBySlug } from "../../utils/data";

/**
 * Resolves the current developer from the URL slug against the typed roster.
 * Returns null for an unknown slug — callers render the not-found page instead
 * of silently falling back to another developer.
 */
export function useMemberFromParams(): { slug: string; member: TeamMember | null } {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  return { slug, member: getMemberBySlug(slug) ?? null };
}
