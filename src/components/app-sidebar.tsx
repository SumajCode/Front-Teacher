'use client'

import * as React from 'react'
import { BookPlus, Command, HomeIcon, UserIcon } from 'lucide-react'

import { NavMain } from '@/components/nav-main'

import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SumajCode</span>
                  <span className="truncate text-xs text-muted">Generacion de Software</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          groups={[
            {
              groupName: 'Principal',
              items: [
                {
                  title: 'Inicio',
                  url: '/',
                  icon: HomeIcon,
                },
                {
                  title: 'Usuarios',
                  url: '/usuarios',
                  icon: UserIcon,
                  items: [
                    { title: 'Alumnos', url: '/usuarios/alumnos' }, // <-- Activo
                    { title: 'Profesores', url: '/usuarios/profesores' },
                  ],
                },
              ],
            },
            {
              groupName: 'Cursos',
              items: [
                {
                  title: 'Mis Cursos',
                  url: '/courses',
                  icon: BookPlus,
                },
              ],
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: 'Erick', email: 'erick@example.com', avatar: '' }} />
      </SidebarFooter>
    </Sidebar>
  )
}
