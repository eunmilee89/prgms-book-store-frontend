import { Theme } from '@/style/theme';
import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

function Tab({ children }: TabProps) {
  return <>{children}</>;
}

interface TabsProps {
  children: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <StyledTabs>
      <div className='tab-header'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className='tab-content'>{tabs[activeIndex]}</div>
    </StyledTabs>
  );
}

const StyledTabs = styled.div`
  .tab-header {
    display: flex;
    gap: 28px;
    border-bottom: 1px solid ${({ theme }) => (theme as Theme).color.border};

    button {
      position: relative;
      padding: 14px 2px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => (theme as Theme).color.secondary};
      transition: color 0.15s ease;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 2px;
        background: ${({ theme }) => (theme as Theme).color.text};
        transform: scaleX(0);
        transition: transform 0.2s ease;
      }

      &:hover {
        color: ${({ theme }) => (theme as Theme).color.text};
      }

      &.active {
        color: ${({ theme }) => (theme as Theme).color.text};

        &::after {
          transform: scaleX(1);
        }
      }
    }
  }

  .tab-content {
    padding: 32px 0;
  }
`;

export { Tabs, Tab };
