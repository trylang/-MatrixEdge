

import dashboard from '@/api/dashboard.js';
import hub from '@/api/hub.js';
import platform from '@/api/platform.js';
import practice from '@/api/practice.js';
import resource from '@/api/resource.js';
import user from '@/api/user.js';

export default {
  ...dashboard,
  ...hub,
  ...platform,
  ...practice,
  ...resource,
  ...user,
}
