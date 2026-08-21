import { useState, useEffect, useCallback } from 'react';
import { reportService, ReportAnalytics } from '../services/reportService';

export const useReports = (initialRange: 'week' | 'month' | '3months' = 'week') => {
  const [range, setRange] = useState<'week' | 'month' | '3months'>(initialRange);
  const [data, setData] = useState<ReportAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async (selectedRange: string) => {
    try {
      setLoading(true);
      setError(null);
      const analytics = await reportService.getReportAnalytics(selectedRange);
      setData(analytics);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load report analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports(range);
  }, [range, fetchReports]);

  const handleExport = async () => {
    try {
      setExporting(true);
      await reportService.downloadReportExport(range);
    } catch (err: any) {
      setError('Failed to export CSV report');
    } finally {
      setExporting(false);
    }
  };

  return {
    range,
    setRange,
    data,
    loading,
    exporting,
    error,
    refetch: () => fetchReports(range),
    exportReport: handleExport,
  };
};
