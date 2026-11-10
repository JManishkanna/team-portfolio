import { useParams } from "react-router-dom";
import { getMemberBySlug } from "../../utils/data";
/**
 * Resolves the current developer from the URL slug against the typed roster.
 * Returns null for an unknown slug — callers render the not-found page instead
 * of silently falling back to another developer.
 */
export function useMemberFromParams() {
    const params = useParams();
    const slug = params.slug ?? "";
    return { slug, member: getMemberBySlug(slug) ?? null };
}
