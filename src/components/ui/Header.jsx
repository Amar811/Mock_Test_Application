import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      // path: '/test-selection-dashboard',
      path: '/',
      icon: 'LayoutDashboard',
      stage: 'selection'
    },
    {
      label: 'Mock Test',
      path: '/mock-test-interface',
      icon: 'FileText',
      stage: 'testing'
    },
    {
      label: 'Results',
      path: '/results-dashboard',
      icon: 'BarChart3',
      stage: 'analysis'
    }
  ];

  const currentPath = location.pathname;
  const isTestingMode = currentPath === '/mock-test-interface';

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon 
              name="GraduationCap" 
              size={24} 
              color="var(--color-primary-foreground)" 
              strokeWidth={2}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-heading font-semibold text-text-primary leading-tight">
              MockTest Pro
            </h1>
            <span className="text-xs font-caption text-text-secondary leading-none">
              Excellence in Assessment
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isTestingMode && (
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="transition-all duration-150"
                >
                  {item.label}
                </Button>
              );
            })}
          </nav>
        )}

        {/* Testing Mode Minimal Navigation */}
        {isTestingMode && (
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} />
              <span className="font-mono">45:30</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => handleNavigation('/test-selection-dashboard')}
                onClick={() => handleNavigation('/')}
              iconName="Home"
              iconPosition="left"
              iconSize={16}
            >
              Exit Test
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            // onClick={toggleMobileMenu}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
            className="transition-transform duration-150"
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {!isTestingMode && (
            <>
              <Button
                variant="ghost"
                size="icon"
                iconName="Bell"
                iconSize={18}
                className="relative"
              >
                <span className="sr-only">Notifications</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                iconName="Settings"
                iconSize={18}
              >
                <span className="sr-only">Settings</span>
              </Button>
            </>
          )}
          <div className="flex items-center space-x-2 pl-3 border-l border-border">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon 
                name="User" 
                size={16} 
                color="var(--color-primary-foreground)" 
              />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-text-primary">Student</p>
              <p className="text-xs text-text-secondary">ID: ST2025001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-surface border-b border-border shadow-moderate animate-slide-down">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  fullWidth
                  // onClick={() => handleNavigation(item.path)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="justify-start"
                >
                  {item.label}
                </Button>
              );
            })}
            
            {/* Mobile User Section */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon 
                    name="User" 
                    size={18} 
                    color="var(--color-primary-foreground)" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Student</p>
                  <p className="text-xs text-text-secondary">ID: ST2025001</p>
                </div>
              </div>
              
              {!isTestingMode && (
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bell"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1"
                  >
                    Notifications
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1"
                  >
                    Settings
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;