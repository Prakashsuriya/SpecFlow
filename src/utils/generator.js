// ============================================================
// Task/Story Generation Engine
// Deterministic, client-side generation from structured input
// ============================================================

const COMPONENT_KEYWORDS = {
    frontend: ['ui', 'interface', 'page', 'form', 'button', 'layout', 'display', 'view', 'dashboard', 'screen', 'widget', 'modal', 'component', 'responsive', 'animation', 'theme', 'navigation', 'menu', 'sidebar', 'header', 'footer', 'card', 'list', 'table', 'chart', 'graph', 'notification', 'toast', 'popup'],
    backend: ['api', 'server', 'database', 'endpoint', 'auth', 'data', 'storage', 'service', 'logic', 'process', 'queue', 'cache', 'webhook', 'cron', 'migration', 'model', 'controller', 'middleware', 'session', 'token', 'encryption'],
    design: ['design', 'ux', 'wireframe', 'mockup', 'prototype', 'brand', 'style', 'color', 'typography', 'icon', 'illustration', 'accessibility', 'usability'],
    testing: ['test', 'qa', 'quality', 'bug', 'regression', 'automation', 'coverage', 'integration', 'e2e', 'unit', 'performance', 'load', 'stress'],
    devops: ['deploy', 'ci', 'cd', 'pipeline', 'docker', 'cloud', 'monitoring', 'logging', 'infrastructure', 'scaling', 'ssl', 'domain', 'cdn', 'hosting'],
};

const USER_TYPES = [
    'end user', 'admin', 'team member', 'manager', 'developer',
    'new user', 'power user', 'mobile user', 'guest', 'subscriber'
];

const PHASES = ['planning', 'development', 'testing', 'deployment'];

function extractKeywords(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
}

function detectComponent(text) {
    const lower = text.toLowerCase();
    for (const [comp, keywords] of Object.entries(COMPONENT_KEYWORDS)) {
        if (keywords.some(kw => lower.includes(kw))) return comp;
    }
    return 'frontend';
}

function detectUserTypes(text) {
    const lower = text.toLowerCase();
    const found = USER_TYPES.filter(ut => lower.includes(ut));
    return found.length > 0 ? found : ['end user'];
}

function assignPriority(index, total) {
    if (index < total * 0.3) return 'high';
    if (index < total * 0.7) return 'medium';
    return 'low';
}

function assignPhase(type, component) {
    if (type === 'story') return 'planning';
    if (component === 'design') return 'planning';
    if (component === 'testing') return 'testing';
    if (component === 'devops') return 'deployment';
    return 'development';
}

// ---- Story Generation ----

function generateBaseStories(goal, targetUsers, constraints) {
    const stories = [];
    const userTypes = detectUserTypes(targetUsers);
    const keywords = extractKeywords(goal);
    const goalLower = goal.toLowerCase();

    // Core functionality stories
    userTypes.forEach(userType => {
        stories.push({
            title: `As a ${userType}, I want to ${goalLower.replace(/\.$/, '')} so that I can accomplish my objectives efficiently`,
            type: 'story',
        });
    });

    // Access & discovery
    stories.push({
        title: `As a ${userTypes[0]}, I want to easily find and access the feature so that I can use it without confusion`,
        type: 'story',
    });

    // Progress & feedback
    stories.push({
        title: `As a ${userTypes[0]}, I want to receive clear feedback when performing actions so that I know my actions were successful`,
        type: 'story',
    });

    // Error handling
    stories.push({
        title: `As a ${userTypes[0]}, I want to see helpful error messages when something goes wrong so that I can recover quickly`,
        type: 'story',
    });

    // Data persistence
    if (keywords.some(k => ['save', 'store', 'data', 'record', 'history', 'draft'].includes(k))) {
        stories.push({
            title: `As a ${userTypes[0]}, I want my data to be saved automatically so that I don't lose my work`,
            type: 'story',
        });
    }

    // Mobile / responsive
    if (keywords.some(k => ['mobile', 'responsive', 'phone', 'tablet'].includes(k))) {
        stories.push({
            title: `As a mobile user, I want the feature to work seamlessly on my device so that I can use it on the go`,
            type: 'story',
        });
    }

    // Collaboration
    if (keywords.some(k => ['team', 'share', 'collaborate', 'invite', 'assign'].includes(k))) {
        stories.push({
            title: `As a team member, I want to share and collaborate on content so that my team stays aligned`,
            type: 'story',
        });
    }

    // Settings / customization
    stories.push({
        title: `As a ${userTypes[0]}, I want to customize my preferences so that the feature works the way I prefer`,
        type: 'story',
    });

    // Constraints-based stories
    if (constraints) {
        const constraintKeywords = extractKeywords(constraints);
        if (constraintKeywords.some(k => ['performance', 'fast', 'speed', 'quick', 'responsive'].includes(k))) {
            stories.push({
                title: `As a ${userTypes[0]}, I want the feature to load quickly so that I'm not frustrated by delays`,
                type: 'story',
            });
        }
        if (constraintKeywords.some(k => ['secure', 'security', 'privacy', 'encrypt', 'auth'].includes(k))) {
            stories.push({
                title: `As a ${userTypes[0]}, I want my data to be secure so that my privacy is protected`,
                type: 'story',
            });
        }
        if (constraintKeywords.some(k => ['accessible', 'accessibility', 'a11y', 'wcag', 'screen reader'].includes(k))) {
            stories.push({
                title: `As a ${userTypes[0]} with accessibility needs, I want the feature to be fully accessible so that I can use it without barriers`,
                type: 'story',
            });
        }
    }

    return stories;
}

// ---- Engineering Task Generation ----

function generateBaseTasks(goal, targetUsers, constraints) {
    const tasks = [];
    const keywords = extractKeywords(goal);
    const goalLower = goal.toLowerCase();

    // Frontend tasks
    tasks.push(
        { title: `Frontend: Design and implement main UI layout for ${goalLower}`, component: 'frontend' },
        { title: `Frontend: Build interactive form components with validation`, component: 'frontend' },
        { title: `Frontend: Implement responsive design for mobile and tablet viewports`, component: 'frontend' },
        { title: `Frontend: Add loading states and skeleton screens for async operations`, component: 'frontend' },
        { title: `Frontend: Implement error handling UI with user-friendly messages`, component: 'frontend' },
    );

    // Backend tasks
    tasks.push(
        { title: `Backend: Design data models and schema for ${goalLower}`, component: 'backend' },
        { title: `Backend: Implement API endpoints for CRUD operations`, component: 'backend' },
        { title: `Backend: Add input validation and sanitization middleware`, component: 'backend' },
        { title: `Backend: Implement error handling and logging`, component: 'backend' },
    );

    // Design tasks
    tasks.push(
        { title: `Design: Create wireframes and high-fidelity mockups`, component: 'design' },
        { title: `Design: Define component library and design tokens`, component: 'design' },
    );

    // Testing tasks
    tasks.push(
        { title: `Testing: Write unit tests for core business logic`, component: 'testing' },
        { title: `Testing: Create integration tests for API endpoints`, component: 'testing' },
        { title: `Testing: Perform cross-browser and device testing`, component: 'testing' },
    );

    // DevOps tasks
    tasks.push(
        { title: `DevOps: Set up CI/CD pipeline for automated deployments`, component: 'devops' },
        { title: `DevOps: Configure staging and production environments`, component: 'devops' },
    );

    // Conditional tasks based on keywords
    if (keywords.some(k => ['search', 'filter', 'find', 'query'].includes(k))) {
        tasks.push(
            { title: `Frontend: Build search and filter UI with real-time results`, component: 'frontend' },
            { title: `Backend: Implement search indexing and query optimization`, component: 'backend' },
        );
    }

    if (keywords.some(k => ['notification', 'alert', 'email', 'notify'].includes(k))) {
        tasks.push(
            { title: `Backend: Implement notification service with email and in-app support`, component: 'backend' },
            { title: `Frontend: Build notification center UI component`, component: 'frontend' },
        );
    }

    if (keywords.some(k => ['upload', 'file', 'image', 'media', 'attachment'].includes(k))) {
        tasks.push(
            { title: `Backend: Implement file upload service with validation and storage`, component: 'backend' },
            { title: `Frontend: Build drag-and-drop file upload component`, component: 'frontend' },
        );
    }

    if (keywords.some(k => ['auth', 'login', 'password', 'account', 'user'].includes(k))) {
        tasks.push(
            { title: `Backend: Implement authentication flow with JWT tokens`, component: 'backend' },
            { title: `Frontend: Build login, registration, and password reset pages`, component: 'frontend' },
        );
    }

    return tasks.map(t => ({ ...t, type: 'task' }));
}

// ---- Template-Specific Tasks ----

function getTemplateTasks(template) {
    const templateTasks = {
        mobile: [
            { title: 'Testing: Perform iOS device testing across multiple screen sizes', type: 'task', component: 'testing' },
            { title: 'Testing: Perform Android device testing across multiple screen sizes', type: 'task', component: 'testing' },
            { title: 'Testing: Validate touch interactions and gesture support', type: 'task', component: 'testing' },
            { title: 'DevOps: Prepare App Store submission and metadata', type: 'task', component: 'devops' },
            { title: 'DevOps: Prepare Google Play Store submission and metadata', type: 'task', component: 'devops' },
            { title: 'Frontend: Implement offline-first caching strategy', type: 'task', component: 'frontend' },
            { title: 'Frontend: Optimize assets and bundle size for mobile networks', type: 'task', component: 'frontend' },
            { title: 'Design: Create app store screenshots and promotional graphics', type: 'task', component: 'design' },
        ],
        web: [
            { title: 'Testing: Verify cross-browser compatibility (Chrome, Firefox, Safari, Edge)', type: 'task', component: 'testing' },
            { title: 'Frontend: Implement SEO meta tags, structured data, and sitemap', type: 'task', component: 'frontend' },
            { title: 'DevOps: Configure CDN for static asset delivery', type: 'task', component: 'devops' },
            { title: 'Frontend: Implement Open Graph and social sharing metadata', type: 'task', component: 'frontend' },
            { title: 'DevOps: Set up SSL certificates and HTTPS redirects', type: 'task', component: 'devops' },
            { title: 'Frontend: Optimize Core Web Vitals (LCP, FID, CLS)', type: 'task', component: 'frontend' },
            { title: 'Backend: Implement server-side rendering or static generation', type: 'task', component: 'backend' },
        ],
        internal: [
            { title: 'Backend: Implement role-based permission system with granular access controls', type: 'task', component: 'backend' },
            { title: 'Backend: Build comprehensive audit logging for all user actions', type: 'task', component: 'backend' },
            { title: 'Frontend: Build admin dashboard with user management and analytics', type: 'task', component: 'frontend' },
            { title: 'Backend: Implement SSO/LDAP integration for enterprise authentication', type: 'task', component: 'backend' },
            { title: 'Frontend: Build activity log viewer for audit trail', type: 'task', component: 'frontend' },
            { title: 'Backend: Implement data export and reporting endpoints', type: 'task', component: 'backend' },
        ],
    };

    return templateTasks[template] || [];
}

// ---- Risks & Unknowns Generation ----

function generateRisks(goal, targetUsers, constraints, template) {
    const risks = [];
    const keywords = extractKeywords(goal);
    const constraintKeywords = constraints ? extractKeywords(constraints) : [];

    // Always include these baseline risks
    risks.push({
        type: 'Assumption',
        text: 'User requirements are assumed to be stable. Scope changes during development may impact timeline and resource allocation.',
    });

    risks.push({
        type: 'Unknown',
        text: 'Third-party service availability and API rate limits need to be validated before integration.',
    });

    // Performance risks
    if (keywords.some(k => ['large', 'scale', 'data', 'real-time', 'streaming', 'big'].includes(k)) ||
        constraintKeywords.some(k => ['performance', 'fast', 'latency'].includes(k))) {
        risks.push({
            type: 'Blocker',
            text: 'Performance at scale has not been validated. Load testing is required to identify bottlenecks before launch.',
        });
    }

    // Security risks
    if (keywords.some(k => ['auth', 'payment', 'sensitive', 'personal', 'financial', 'health'].includes(k)) ||
        constraintKeywords.some(k => ['security', 'compliance', 'gdpr', 'hipaa', 'pci'].includes(k))) {
        risks.push({
            type: 'Blocker',
            text: 'Security audit and compliance review required. Data handling must comply with relevant regulations before deployment.',
        });
    }

    // Integration risks
    if (keywords.some(k => ['integrate', 'api', 'third-party', 'external', 'connect', 'sync'].includes(k))) {
        risks.push({
            type: 'Unknown',
            text: 'External API contracts and versioning strategy need clarification. Changes to third-party APIs could break integration.',
        });
    }

    // Mobile-specific risks
    if (template === 'mobile') {
        risks.push({
            type: 'Blocker',
            text: 'App store review timelines are unpredictable. Submit early to allow for rejection and resubmission cycles.',
        });
        risks.push({
            type: 'Unknown',
            text: 'Device fragmentation on Android may introduce rendering inconsistencies that need device-specific fixes.',
        });
    }

    // Web-specific risks
    if (template === 'web') {
        risks.push({
            type: 'Unknown',
            text: 'SEO impact of client-side rendering needs evaluation. Server-side rendering may be required for search visibility.',
        });
    }

    // Internal tool risks
    if (template === 'internal') {
        risks.push({
            type: 'Assumption',
            text: 'Existing permission infrastructure can support the required granularity. Custom permission system may be needed.',
        });
        risks.push({
            type: 'Unknown',
            text: 'Integration with existing enterprise identity providers (SSO/LDAP) needs technical investigation.',
        });
    }

    // Data migration
    if (keywords.some(k => ['migrate', 'legacy', 'existing', 'convert', 'import'].includes(k))) {
        risks.push({
            type: 'Blocker',
            text: 'Data migration from legacy systems requires detailed mapping. Incomplete migrations could cause data loss.',
        });
    }

    // Timeline risk
    risks.push({
        type: 'Assumption',
        text: 'Team capacity and skill availability are sufficient for the estimated timeline. Resource conflicts may delay delivery.',
    });

    return risks;
}

// ============================================================
// MAIN EXPORT: generateSpec
// ============================================================

export function generateSpec({ goal, targetUsers, constraints, template }) {
    const stories = generateBaseStories(goal, targetUsers, constraints);
    const baseTasks = generateBaseTasks(goal, targetUsers, constraints);
    const templateTasks = getTemplateTasks(template);
    const allTasks = [...baseTasks, ...templateTasks];
    const risks = generateRisks(goal, targetUsers, constraints, template);

    // Assign IDs, priorities, and phases
    const totalItems = stories.length + allTasks.length;

    const enrichedStories = stories.map((story, i) => ({
        ...story,
        id: crypto.randomUUID(),
        priority: assignPriority(i, stories.length),
        component: 'design',
        phase: 'planning',
        description: '',
    }));

    const enrichedTasks = allTasks.map((task, i) => ({
        ...task,
        id: crypto.randomUUID(),
        priority: assignPriority(i, allTasks.length),
        phase: assignPhase('task', task.component),
        description: '',
    }));

    const enrichedRisks = risks.map(risk => ({
        ...risk,
        id: crypto.randomUUID(),
    }));

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        featureName: goal.length > 60 ? goal.substring(0, 60) + '...' : goal,
        template,
        goal,
        targetUsers,
        constraints,
        stories: enrichedStories,
        tasks: enrichedTasks,
        risks: enrichedRisks,
    };
}
