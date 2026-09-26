import TutorProfile from "../models/TutorProfile.js";

export async function findTutorMatches({
  subject,
  topic,
  tags = [],
  limit = 10,
}) {
  const tutors = await TutorProfile.find({
    isVerified: true,
  })
    .populate("userId", "name email profileImage college department year")
    .lean();

  const normalizedSubject = String(subject || "").toLowerCase();
  const normalizedTopic = String(topic || "").toLowerCase();

  const normalizedTags = tags.map((tag) =>
    String(tag).toLowerCase()
  );

  const scored = tutors.map((tutor) => {
    let score = 0;

    const subjects = (tutor.subjects || []).map((item) =>
      String(item).toLowerCase()
    );

    const topics = (tutor.topics || []).map((item) =>
      String(item).toLowerCase()
    );

    const skills = (tutor.skills || []).map((item) =>
      String(item).toLowerCase()
    );

    // Subject match
    if (
      normalizedSubject &&
      subjects.some(
        (item) =>
          item.includes(normalizedSubject) ||
          normalizedSubject.includes(item)
      )
    ) {
      score += 50;
    }

    // Topic match
    if (
      normalizedTopic &&
      topics.some(
        (item) =>
          item.includes(normalizedTopic) ||
          normalizedTopic.includes(item)
      )
    ) {
      score += 30;
    }

    // Tag/skill matching
    for (const tag of normalizedTags) {
      if (
        skills.some(
          (skill) =>
            skill.includes(tag) ||
            tag.includes(skill)
        )
      ) {
        score += 5;
      }
    }

    // Rating contribution
    score += Math.min(Number(tutor.rating || 0) * 2, 10);

    return {
      ...tutor,
      matchScore: score,
    };
  });

  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}