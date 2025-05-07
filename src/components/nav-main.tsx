"use client"

import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}

type NavGroup = {
  groupName: string
  items: NavItem[]
}

export function NavMain({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.groupName}>
          <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => {
              // Activo si la url del item es igual a la ruta actual
              const isItemActive =
                item.url === pathname ||
                (item.items && item.items.some((sub) => sub.url === pathname))

              return item.items && item.items.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isItemActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={
                          isItemActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-[#a78bfa] rounded-l-lg"
                            : ""
                        }
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubActive = subItem.url === pathname
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={
                                  isSubActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-[#a78bfa] rounded-l-lg"
                                    : ""
                                }
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={
                      isItemActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-[#a78bfa] rounded-l-lg"
                        : ""
                    }
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-2 w-full"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
