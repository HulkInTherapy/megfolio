/**
 * Illustration Assets - The Living Sketchbook
 *
 * NOTE: Large SVG files (>100KB) are served from /public/illustrations/
 * to avoid bundling issues. Use the path constants below.
 */

// ========================================
// PATH CONSTANTS - For large illustrations
// Load via <img src={path}> to avoid bundling
// ========================================

export const IllustrationPaths = {
  // Essential (large files)
  sketchbookCover: '/illustrations/sketchbook-cover.svg',
  selfPortraitDoodle: '/illustrations/self-portrait-doodle.svg',
  mindExplosion: '/illustrations/mind-explosion.svg',
  projectSearch: '/illustrations/project-search.svg',
  projectConversation: '/illustrations/project-conversation.svg',
  projectPipeline: '/illustrations/project-pipeline.svg',
  projectVoice: '/illustrations/project-voice.svg',
  envelopeSpecial: '/illustrations/envelope-special.svg',

  // Decorative (also large)
  coffeeRingStain: '/illustrations/coffee-ring-stain.svg',
  tapePieces: '/illustrations/tape-pieces.svg',
  tornPaperEdge: '/illustrations/torn-paper-edge.svg',
  stickyNotesSet: '/illustrations/sticky-notes-set.svg',
  paperClip: '/illustrations/paper-clip.svg',
  pushPin: '/illustrations/push-pin.svg',
  foldedNote: '/illustrations/folded-note.svg',
  stickerPack: '/illustrations/sticker-pack.svg',
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Get illustration path by project ID
 * @param {string} projectId - Project identifier
 * @returns {string|null} Path to illustration
 */
export const getProjectIllustrationPath = (projectId) => {
  const mapping = {
    search: IllustrationPaths.projectSearch,
    'neural-search': IllustrationPaths.projectSearch,
    conversation: IllustrationPaths.projectConversation,
    'conversation-ai': IllustrationPaths.projectConversation,
    pipeline: IllustrationPaths.projectPipeline,
    'ml-pipeline': IllustrationPaths.projectPipeline,
    voice: IllustrationPaths.projectVoice,
    'voice-clone': IllustrationPaths.projectVoice,
    'voice-synthesis': IllustrationPaths.projectVoice,
  };

  const key = projectId?.toLowerCase().replace(/\s+/g, '-');
  return mapping[key] || null;
};

/**
 * Illustration component that handles loading
 */
export const Illustration = ({
  name,
  alt = '',
  className = '',
  style = {},
  ...props
}) => {
  const path = IllustrationPaths[name];

  if (!path) {
    console.warn(`Illustration "${name}" not found`);
    return null;
  }

  return (
    <img
      src={path}
      alt={alt || name}
      className={`illustration ${className}`}
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...style,
      }}
      loading="lazy"
      {...props}
    />
  );
};

export default IllustrationPaths;
