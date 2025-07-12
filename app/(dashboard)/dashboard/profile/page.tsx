'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/StatCard';
import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  CreditCard,
  Flame,
  Gem,
  Mail,
  Pencil,
  Shield,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import useSWR from 'swr';
import type { User as UserType } from '@/lib/db/types';

// Mock data - in a real app this would come from your backend
const userPower = {
  level: 'Rookie',
  xp: 1250,
  nextLevelXp: 2000,
  rank: 34,
  streak: 3,
  badges: ['Early Power Hub Founder', 'Cold Outreach Titan'],
  credits: 450,
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

function MyPowerSection() {
  const progressPercentage = (userPower.xp / userPower.nextLevelXp) * 100;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
          <Zap className="h-5 w-5 text-yellow-500" />
          My Power
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {userPower.level}
            </h3>
            <p className="text-sm text-muted-foreground">
              Rank #{userPower.rank} this week
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
              <Flame className="h-4 w-4" />
              <span className="font-semibold">{userPower.streak} day streak</span>
            </div>
            <p className="text-xs text-muted-foreground">
              +10% credits on next purchase
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1 text-muted-foreground">
            <span>XP Progress</span>
            <span>
              {userPower.xp} / {userPower.nextLevelXp}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-2">
          {userPower.badges.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
            >
              <Trophy className="h-3 w-3 mr-1" />
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg">
          <div className="flex items-center gap-2">
            <Gem className="h-5 w-5 text-purple-500" />
            <span className="font-semibold">{userPower.credits}</span>
            <span className="text-sm text-muted-foreground">Ravna Credits</span>
          </div>
          <Button size="sm" variant="outline">
            Get More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UserDetailsCard({ user }: { user: UserType | undefined }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
          <span>{user?.email ?? 'olivia.martin@email.com'}</span>
          <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
            Verified
          </Badge>
        </div>
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-3 text-muted-foreground" />
          <span>{user?.company ?? 'Acme Inc.'}</span>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-3 text-muted-foreground" />
          <span>{user?.role ?? 'Project Manager'}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
          <span>Joined on {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'January 20, 2023'}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  const { data: user, error } = useSWR<UserType>('/api/user', fetcher);

  const getInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('');
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.avatar_url || ''} alt={user?.name || 'User Avatar'} />
            <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.name ?? 'Olivia Martin'}</h1>
            <p className="text-muted-foreground">{user?.email ?? 'olivia.martin@email.com'}</p>
          </div>
        </div>
        <Button>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <MyPowerSection />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Usage Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Messages Sent" value="170" />
              <StatCard title="Open Rate" value="25%" />
              <StatCard title="Reply Rate" value="10%" />
              <StatCard title="Meetings Booked" value="4" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <UserDetailsCard user={user} />
          <Card>
            <CardHeader>
              <CardTitle>Account & Billing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" /> Security Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" /> Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 