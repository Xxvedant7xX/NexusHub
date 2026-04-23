import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { FORM_DEFAULTS, MEMBER_NAME_SUGGESTIONS } from "../data/team.js";
import { createMember } from "../lib/api.js";

const roleSuggestions = [
  "Creative Director",
  "Community Strategist",
  "Systems Architect",
  "Performance Lead",
  "Product Visionary",
  "Experience Curator",
  "Visual Experience Lead",
];

const AddMemberPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(FORM_DEFAULTS);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ tone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!formValues.image) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(formValues.image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formValues.image]);

  const validate = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) nextErrors.name = "Name is required.";
    if (!formValues.role.trim()) nextErrors.role = "Role is required.";
    if (!formValues.email.trim()) nextErrors.email = "Email is required.";
    if (!formValues.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!formValues.rollNumber.trim()) nextErrors.rollNumber = "Roll number is required.";
    if (!formValues.year.trim()) nextErrors.year = "Year is required.";
    if (!formValues.degree.trim()) nextErrors.degree = "Degree is required.";
    if (!formValues.aboutProject.trim()) nextErrors.aboutProject = "Project summary is required.";
    if (!formValues.hobbies.trim()) nextErrors.hobbies = "Add at least one hobby.";
    if (!formValues.certificate.trim()) nextErrors.certificate = "Certificate is required.";
    if (!formValues.internship.trim()) nextErrors.internship = "Internship is required.";
    if (!formValues.aboutAim.trim()) nextErrors.aboutAim = "Aim is required.";
    if (!formValues.image) nextErrors.image = "A profile image is required.";

    const emailValue = formValues.email.trim();
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Enter a valid email address.";
    }

    return nextErrors;
  };

  const handleValueChange = (event) => {
    const { name, value, files } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: files ? files[0] : value,
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        tone: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      return;
    }

    const memberFormData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      memberFormData.append(key, value);
    });

    setIsSubmitting(true);
    setStatus({ tone: "", message: "" });

    try {
      const createdMember = await createMember(memberFormData);

      setStatus({
        tone: "success",
        message: `${createdMember.name} has been added successfully. Redirecting to the detail page...`,
      });
      setFormValues(FORM_DEFAULTS);
      setErrors({});

      window.setTimeout(() => {
        navigate(`/member/${createdMember.id}`);
      }, 800);
    } catch (error) {
      setStatus({
        tone: "error",
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-stack">
      <SectionHeader
        eyebrow="Add Member"
        title="Create a new profile with image upload."
        description="Fill out the form to create a new NexusHub team member profile with live validation, image preview, and instant feedback."
      />

      <div className="form-layout">
        <GlassPanel className="form-panel">
          {status.message ? (
            <div className={`status-banner status-banner--${status.tone}`}>{status.message}</div>
          ) : null}

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                onChange={handleValueChange}
                placeholder="Enter member name"
                value={formValues.name}
              />
              {errors.name ? <span className="field-error">{errors.name}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="role">Role</label>
              <input
                id="role"
                list="role-options"
                name="role"
                onChange={handleValueChange}
                placeholder="Enter team role"
                value={formValues.role}
              />
              <datalist id="role-options">
                {roleSuggestions.map((role) => (
                  <option key={role} value={role} />
                ))}
              </datalist>
              {errors.role ? <span className="field-error">{errors.role}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                onChange={handleValueChange}
                placeholder="name@example.com"
                type="email"
                value={formValues.email}
              />
              {errors.email ? <span className="field-error">{errors.email}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="phone">Contact Number</label>
              <input
                id="phone"
                name="phone"
                onChange={handleValueChange}
                placeholder="+91 90000 00000"
                value={formValues.phone}
              />
              {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="rollNumber">Roll Number</label>
              <input
                id="rollNumber"
                name="rollNumber"
                onChange={handleValueChange}
                placeholder="BTR-008"
                value={formValues.rollNumber}
              />
              {errors.rollNumber ? <span className="field-error">{errors.rollNumber}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="year">Year</label>
              <input
                id="year"
                name="year"
                onChange={handleValueChange}
                placeholder="2026"
                value={formValues.year}
              />
              {errors.year ? <span className="field-error">{errors.year}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="degree">Degree</label>
              <input
                id="degree"
                name="degree"
                onChange={handleValueChange}
                placeholder="B.Tech - Full Stack Development"
                value={formValues.degree}
              />
              {errors.degree ? <span className="field-error">{errors.degree}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="certificate">Certificate</label>
              <input
                id="certificate"
                name="certificate"
                onChange={handleValueChange}
                placeholder="Cloud Computing"
                value={formValues.certificate}
              />
              {errors.certificate ? <span className="field-error">{errors.certificate}</span> : null}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="aboutProject">About Project</label>
              <textarea
                id="aboutProject"
                name="aboutProject"
                onChange={handleValueChange}
                placeholder="What does this member handle in the team?"
                value={formValues.aboutProject}
              />
              {errors.aboutProject ? (
                <span className="field-error">{errors.aboutProject}</span>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="hobbies">Hobbies</label>
              <input
                id="hobbies"
                name="hobbies"
                onChange={handleValueChange}
                placeholder="Comma separated hobbies"
                value={formValues.hobbies}
              />
              {errors.hobbies ? <span className="field-error">{errors.hobbies}</span> : null}
            </div>

            <div className="form-field">
              <label htmlFor="internship">Internship</label>
              <input
                id="internship"
                name="internship"
                onChange={handleValueChange}
                placeholder="Internship or experience"
                value={formValues.internship}
              />
              {errors.internship ? <span className="field-error">{errors.internship}</span> : null}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="aboutAim">About Aim</label>
              <textarea
                id="aboutAim"
                name="aboutAim"
                onChange={handleValueChange}
                placeholder="Career aim or team goal"
                value={formValues.aboutAim}
              />
              {errors.aboutAim ? <span className="field-error">{errors.aboutAim}</span> : null}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="image">Profile Image</label>
              <input
                accept="image/*"
                id="image"
                name="image"
                onChange={handleValueChange}
                type="file"
              />
              <span className="field-helper">
                Upload a professional photo, poster-style avatar, or themed team visual.
              </span>
              {errors.image ? <span className="field-error">{errors.image}</span> : null}
            </div>

            <div className="form-actions form-field--full">
              <button className="button" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Submit Member"}
              </button>
              <Link className="button button--ghost" to="/view-members">
                Cancel
              </Link>
            </div>
          </form>
        </GlassPanel>

        <div className="side-stack">
          <GlassPanel className="preview-panel">
            <SectionHeader
              eyebrow="Live Preview"
              title="Your member card updates as you build it."
              description="This keeps the form from feeling like a wall of inputs."
            />

            <div className="preview-card">
              <div className="preview-image">
                {previewUrl ? (
                  <img src={previewUrl} alt="New member preview" />
                ) : (
                  <div className="preview-placeholder">
                    <strong>{formValues.name ? formValues.name.slice(0, 2).toUpperCase() : "BT"}</strong>
                    <span>Image preview will appear here</span>
                  </div>
                )}
              </div>

              <div className="preview-copy">
                <span className="eyebrow">NexusHub</span>
                <h3>{formValues.name || "Future Team Member"}</h3>
                <p>{formValues.role || "Role will appear here"}</p>
                <div className="member-card__meta">
                  <span className="inline-badge">{formValues.rollNumber || "ROLL"}</span>
                  <span className="inline-badge">{formValues.year || "YEAR"}</span>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="tips-panel">
            <SectionHeader
              eyebrow="Suggested names"
              title="Theme-friendly member ideas"
              description="These are the NexusHub team members. Click any name to auto-fill the name field."
            />

            <div className="name-chip-grid">
              {MEMBER_NAME_SUGGESTIONS.map((name) => (
                <button
                  key={name}
                  className="chip"
                  onClick={() =>
                    setFormValues((currentValues) => ({
                      ...currentValues,
                      name,
                    }))
                  }
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default AddMemberPage;
