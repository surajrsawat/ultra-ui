import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const coveragePath = path.join(rootDir, 'coverage', 'coverage-summary.json');
const vitestPath = path.join(rootDir, 'reports', 'vitest-report.json');
const duplicationPath = path.join(rootDir, 'reports', 'jscpd', 'jscpd-report.json');
const markdownReportPath = path.join(rootDir, 'reports', 'pr-test-summary.md');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function formatPercent(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'Unavailable';
  }

  return `${value.toFixed(2)}%`;
}

function toRelativePath(filePath) {
  if (!filePath) {
    return 'Unavailable';
  }

  return path.relative(rootDir, filePath).split(path.sep).join('/');
}

function collectFailingTests(vitestReport) {
  if (!vitestReport?.testResults) {
    return [];
  }

  return vitestReport.testResults
    .map((suite) => {
      const failingCases = (suite.assertionResults ?? [])
        .filter((assertion) => assertion.status === 'failed')
        .map((assertion) => assertion.fullName || assertion.title || 'Unnamed failing test');

      if (failingCases.length === 0) {
        return null;
      }

      return {
        fileName: path.basename(suite.name ?? 'Unknown file'),
        filePath: toRelativePath(suite.name),
        failingCases,
      };
    })
    .filter(Boolean);
}

function getDuplicationMetrics(duplicationReport) {
  const stats = duplicationReport?.statistics?.total ?? duplicationReport?.statistics ?? {};

  return {
    percentage: typeof stats.percentage === 'number' ? stats.percentage : null,
    clones: typeof stats.clones === 'number' ? stats.clones : null,
    duplicatedLines: typeof stats.duplicatedLines === 'number' ? stats.duplicatedLines : null,
  };
}

const coverageReport = readJson(coveragePath);
const vitestReport = readJson(vitestPath);
const duplicationReport = readJson(duplicationPath);

const failingTests = collectFailingTests(vitestReport);
const duplicationMetrics = getDuplicationMetrics(duplicationReport);
const totalCoverage = coverageReport?.total ?? {};
const testExitCode = process.env.TEST_EXIT_CODE ?? '1';
const duplicationExitCode = process.env.DUPLICATION_EXIT_CODE ?? '1';
const testStatus = testExitCode === '0' ? 'Passed' : 'Failed';
const duplicationStatus = duplicationExitCode === '0' ? 'Available' : 'Unavailable';

const lines = [
  '## Test Case Check',
  '',
  '| Metric | Value |',
  '| --- | --- |',
  `| Test Result | ${testStatus} |`,
  `| Total Tests | ${vitestReport?.numTotalTests ?? 'Unavailable'} |`,
  `| Passed Tests | ${vitestReport?.numPassedTests ?? 'Unavailable'} |`,
  `| Failed Tests | ${vitestReport?.numFailedTests ?? 'Unavailable'} |`,
  `| Test Coverage (Lines) | ${formatPercent(totalCoverage.lines?.pct)} |`,
  `| Test Coverage (Branches) | ${formatPercent(totalCoverage.branches?.pct)} |`,
  `| Test Coverage (Functions) | ${formatPercent(totalCoverage.functions?.pct)} |`,
  `| Test Coverage (Statements) | ${formatPercent(totalCoverage.statements?.pct)} |`,
  `| Code Duplication | ${duplicationStatus === 'Available' ? formatPercent(duplicationMetrics.percentage) : 'Unavailable'} |`,
  `| Duplicate Clones | ${duplicationStatus === 'Available' ? duplicationMetrics.clones ?? '0' : 'Unavailable'} |`,
  `| Duplicated Lines | ${duplicationStatus === 'Available' ? duplicationMetrics.duplicatedLines ?? '0' : 'Unavailable'} |`,
  '',
];

if (duplicationStatus !== 'Available') {
  lines.push('Code duplication analysis did not complete successfully.', '');
}

if (failingTests.length > 0) {
  lines.push('### Failing Test Results', '', '| File Name | File Path | Failing Test Cases |', '| --- | --- | --- |');

  for (const failingTest of failingTests) {
    lines.push(
      `| ${failingTest.fileName} | ${failingTest.filePath} | ${failingTest.failingCases.join('<br>')} |`,
    );
  }

  lines.push('');
} else {
  lines.push('No failing test cases were reported.', '');
}

if (summaryPath) {
  fs.appendFileSync(summaryPath, `${lines.join('\n')}\n`);
}

fs.mkdirSync(path.dirname(markdownReportPath), { recursive: true });
fs.writeFileSync(markdownReportPath, `${lines.join('\n')}\n`);