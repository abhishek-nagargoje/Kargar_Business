import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import { KargarSinglePage } from '@/pages/KargarSinglePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ServicesProvider } from '@/features/services/context/ServicesProvider';
import { CategoryPage } from '@/features/services/pages/CategoryPage';
import { ServicePage } from '@/features/services/pages/ServicePage';
import { PuneLandingPage } from '@/features/pune-landing/pages/PuneLandingPage';
import { punePageList } from '@/features/pune-landing/config/punePages';
import { ResourcesHubPage } from '@/features/resources/pages/ResourcesHubPage';
import { GuidePage } from '@/features/resources/pages/GuidePage';
import { guidePageList } from '@/features/resources/config/guides';

/** Lazy-loaded admin routes for code splitting */
const AdminLoginPage = lazy(() => import('@/features/admin/pages/AdminLoginPage'));
const ForgotPasswordPage = lazy(() => import('@/features/admin/pages/ForgotPasswordPage'));
const UpdatePasswordPage = lazy(() => import('@/features/admin/pages/UpdatePasswordPage'));
const AdminDashboardPage = lazy(() => import('@/features/admin/pages/AdminDashboardPage'));
const AdminReviewsPage = lazy(() => import('@/features/admin/pages/AdminReviewsPage'));
const AdminContactsPage = lazy(() => import('@/features/admin/pages/AdminContactsPage'));
const AdminMediaLibraryPage = lazy(() => import('@/features/admin/pages/AdminMediaLibraryPage'));
import { AdminLayout } from '@/features/admin/components/AdminLayout';

import { AuthProvider } from '@/contexts/AuthProvider';

import { ScrollToTop } from '@/components/layout/ScrollToTop';

import { Analytics } from '@/components/Analytics';
import { GlobalCameraModal } from '@/media-sdk/capture-ui/GlobalCameraModal';

import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';

/**
 * Root application component.
 * - HomePage is eagerly loaded (main content)
 * - Admin routes are code-split and lazy-loaded
 */
export default function App() {
  return (
    <AuthProvider>
      <ServicesProvider>
        <Analytics />
        <ScrollToTop />
        <Suspense>
          <Routes>
          <Route path="/" element={<KargarSinglePage />} />
          <Route path="/services" element={<KargarSinglePage />} />
          <Route path="/services/:categoryId" element={<CategoryPage />} />
          <Route path="/services/:categoryId/:serviceId" element={<ServicePage />} />
          <Route path="/sectors" element={<KargarSinglePage />} />
          <Route path="/company-profile" element={<KargarSinglePage />} />
          <Route path="/support" element={<KargarSinglePage />} />
          <Route path="/contact-us" element={<KargarSinglePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          {/* Pune landing pages and guides are generated from their content configs (single source of truth). */}
          {punePageList.map((page) => (
            <Route key={page.path} path={page.path} element={<PuneLandingPage />} />
          ))}
          <Route path="/resources" element={<ResourcesHubPage />} />
          {guidePageList.map((guide) => (
            <Route key={guide.path} path={guide.path} element={<GuidePage />} />
          ))}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin/update-password" element={<UpdatePasswordPage />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="contacts" element={<AdminContactsPage />} />
            <Route path="media" element={<AdminMediaLibraryPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      </ServicesProvider>
      <GlobalCameraModal />
    </AuthProvider>
  );
}
