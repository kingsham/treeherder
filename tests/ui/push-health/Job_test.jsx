import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import Job from '../../../ui/push-health/Job';
import pushHealth from '../mock/push_health';

const repoName = 'try';
const failJob =
  pushHealth.metrics.tests.details.needInvestigation[5].failJobs[0];
const passJob =
  pushHealth.metrics.tests.details.needInvestigation[5].passJobs[0];

describe('Job', () => {
  const testJob = job => (
    <Job job={job} repo={repoName} revision="432432432432" />
  );

  test('should show a failed job', async () => {
    const { getByText } = render(testJob(failJob));
    const job = await waitForElement(() => getByText('bc15'));

    expect(job.getAttribute('href')).toBe(
      '/#/jobs?selectedJob=285363868&repo=try&revision=432432432432',
    );
    expect(job).toHaveClass('btn-orange');
    expect(getByText('Failed in parent')).toBeInTheDocument();
  });

  test('should show a success job', async () => {
    const { getByText } = render(testJob(passJob));
    const job = await waitForElement(() => getByText('bc15'));

    expect(job.getAttribute('href')).toBe(
      '/#/jobs?selectedJob=285369162&repo=try&revision=432432432432',
    );
    expect(job).toHaveClass('btn-green');
  });
});
